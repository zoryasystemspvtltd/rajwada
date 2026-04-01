using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;
using System.Timers;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/bulkdataupload/")]
[Authorize]
public class BulkDataUploadController : ControllerBase
{
    private readonly ILogger<BulkDataUploadController> logger;
    private readonly RajDataService dataService;
    public BulkDataUploadController(ILogger<BulkDataUploadController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    [HasPrivileges("add")]
    [HttpPost]
    public async Task<dynamic> PostAsync([FromForm] BulkDataUpload model, CancellationToken token)
    {
        BulkResponse response = new();
        try
        {
            if (model?.File == null || model.File.Length <= 0)
            {
                return BadRequest("No file was uploaded");
            }

            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "BulkDataUploads");
            //create the folder if not exist
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            string fileName = model.File.FileName.Split('.')[0];
            bool flag = CheckedTemplateAccordingtoModule(fileName, model.Title);
            if (flag)
            {
                string uniquefilename = string.Concat(fileName, DateTime.Now.ToString("ddMMyyyymmss"), ".xlsx");
                string filepath = Path.Combine(folderPath, uniquefilename);
                //save uploaded file
                using (var fileStream = new FileStream(filepath, FileMode.Create))
                {
                    await model.File.CopyToAsync(fileStream);
                }
                response = await ProcessExcelData(fileName, filepath, response, token);
            }
            else
                response.FailureData.Add("Uploaded a wrong template file!");

        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
            response.FailureData.Add(ex.Message);
        }

        return response;
    }

    private async Task<BulkResponse> ProcessExcelData(string dataModel, string filePath, BulkResponse response, CancellationToken token)
    {
        try
        {
            DataTable dt = new();
            // Open the Excel file using ClosedXML.
            // Keep in mind the Excel file cannot be open when trying to read it
            using (XLWorkbook workBook = new XLWorkbook(filePath))
            {
                //Read the first Sheet from Excel file.
                IXLWorksheet workSheet = workBook.Worksheet(1); ;

                //Loop through the Worksheet rows.
                bool firstRow = true;
                foreach (IXLRow row in workSheet.Rows())
                {
                    //Use the first row to add columns to DataTable.
                    if (firstRow)
                    {
                        foreach (IXLCell cell in row.Cells())
                        {
                            dt.Columns.Add(cell.Value.ToString());
                        }
                        firstRow = false;
                    }
                    else
                    {
                        //Add rows to DataTable.
                        dt.Rows.Add();
                        int i = 0;

                        foreach (IXLCell cell in row.Cells(row.FirstCellUsed().Address.ColumnNumber, row.LastCellUsed().Address.ColumnNumber))
                        {
                            dt.Rows[dt.Rows.Count - 1][i] = cell.Value.ToString();
                            i++;
                        }
                    }
                }


                // Save DataTable to database
                if (dt.Rows.Count > 0)
                    response = await SaveToDatabase(dataModel, dt, response, token);
                else
                    response.FailureData?.Add("No data in excelsheet");
            }
        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
            response.FailureData?.Add(ex.Message);
        }
        return response;

    }

    private async Task<BulkResponse> SaveToDatabase(
    string dataModel, DataTable dataTable, BulkResponse response, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(x => x.Type == "activity-member").Value;
            var key = User.Claims.First(x => x.Type == "activity-key").Value;

            dataService.Identity = new ModuleIdentity(member, key);

            dataModel = dataModel?.ToUpperInvariant();

            var creators = new Dictionary<string, Func<DataRow, (dynamic?, BulkResponse)>>
            {
                ["TOWERDETAILS"] = row => CreateTowerDataModel(row, member, key, response),
                ["FLATDETAILS"] = row => CreateFlatDataModel(row, member, key, response),
                ["FLOORDETAILS"] = row => CreateFloorDataModel(row, member, key, response),
                ["UOMDETAILS"] = row => CreateUOMDataModel(row, member, key, response),
                ["ASSETTYPE"] = row => CreateAssetTypeDataModel(row, member, key, response),
                ["ASSETGROUP"] = row => CreateAssetGroupDataModel(row, member, key, response),
                ["OUTSIDEENTITYTYPE"] = row => CreateOutSideEntityTypeDataModel(row, member, key, response),
                ["PARKINGTYPE"] = row => CreateParkingTypeDataModel(row, member, key, response)
            };

            if (!creators.TryGetValue(dataModel, out var createFunc))
                return response;

            foreach (DataRow row in dataTable.Rows)
            {
                var (data, updatedResponse) = createFunc(row);
                response = updatedResponse;

                if (data == null) continue;

                long planId = await dataService.SaveDataAsync("Plan", data, token);

                if (planId > 0 && dataModel == "FLATDETAILS")
                {
                    var (rooms, res) = CreateRoomDetailsDataModel(row, planId, member, key, response);
                    response = res;

                    if (rooms is List<RoomDetails> roomList && roomList.Count > 0)
                    {
                        foreach (var item in roomList)
                            await dataService.SaveDataAsync("RoomDetails", item, token);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving data");
            response.FailureData?.Add(ex.Message);
        }

        return response;
    }

    private (dynamic?, BulkResponse) CreateParkingTypeDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        return CreateSimpleDataModel(row, member, response, "ParkingType",
            (name, alias, m) => new ParkingType
            {
                Date = DateTime.Now,
                Member = m,
                Key = key,
                Name = name,
                Code = alias
            });
    }

    private (dynamic?, BulkResponse) CreateOutSideEntityTypeDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        return CreateSimpleDataModel(row, member, response, "OutSideEntityType",
            (name, alias, m) => new OutSideEntityType
            {
                Date = DateTime.Now,
                Member = m,
                Key = key,
                Name = name,
                Code = alias
            });
    }

    private (dynamic?, BulkResponse) CreateAssetGroupDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        return CreateSimpleDataModel(row, member, response, "AssetGroup",
            (name, alias, m) => new AssetGroup
            {
                Date = DateTime.Now,
                Member = m,
                Key = key,
                Name = name,
                Code = alias
            });
    }

    private (dynamic?, BulkResponse) CreateAssetTypeDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        return CreateSimpleDataModel(row, member, response, "AssetType",
            (name, alias, m) => new AssetType
            {
                Date = DateTime.Now,
                Member = m,
                Key = key,
                Name = name,
                Code = alias
            });
    }
    private (dynamic?, BulkResponse) CreateUOMDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        return CreateSimpleDataModel(row, member, response, "UOM",
            (name, alias, m) => new Uom
            {
                Date = DateTime.Now,
                Member = m,
                Key = key,
                Name = name,
                Code = alias
            });
    }

    private (TEntity?, BulkResponse) CreateSimpleDataModel<TEntity>(
    DataRow row, string member, BulkResponse response, string moduleName,
    Func<string, string, string, TEntity> factory)
    where TEntity : class
    {
        var name = row[0]?.ToString();
        var alias = row[1]?.ToString();

        if (string.IsNullOrWhiteSpace(name))
        {
            response.FailureData.Add("Name is required!");
            return (null, response);
        }

        // Duplicate Check
        if (GetModuleDetails(moduleName, "Name", name, null, 0) != null)
        {
            response.FailureData.Add($"{name}: Already exists!");
            return (null, response);
        }

        response.SuccessData.Add($"{name} added!");

        return (factory(name, alias, member), response);
    }
    private (dynamic data, BulkResponse response) CreateRoomDetailsDataModel(
     DataRow row, long planId, string member, string key, BulkResponse response)
    {
        var result = new List<RoomDetails>();

        if (row.Table.Columns.Count <= 4)
        {
            response.FailureData.Add("No Rooms exist in the excelsheet!");
            return (null, response);
        }

        for (int i = 4; i < row.Table.Columns.Count; i++)
        {
            var roomName = row.Table.Columns[i].ToString();
            var value = row[i]?.ToString();

            try
            {
                if (string.IsNullOrWhiteSpace(value))
                {
                    response.FailureData.Add($"{roomName}: value is blank!");
                    continue;
                }

                if (!int.TryParse(value, out int quantity) || quantity <= 0)
                    continue;

                var roomType = GetModuleDetails("RoomType", "Name", roomName, null, 0);
                if (roomType == null)
                {
                    response.FailureData.Add($"{roomName}: Room name not exist!");
                    continue;
                }

                for (int j = 1; j <= quantity; j++)
                {
                    var exists = GetModuleDetails("RoomDetails", "RoomId",
                        roomType.Id.ToString(), "RoomType", planId);

                    if (exists != null)
                    {
                        response.FailureData.Add($"{roomType.Name}: already exists!");
                        continue;
                    }

                    result.Add(new RoomDetails
                    {
                        RoomId = $"{roomName}-{j}",
                        Name = $"{roomType}-{j}",
                        Date = DateTime.Now,
                        Member = member,
                        Key = key,
                        RoomTypeId = roomType.Id,
                        PlanId = planId
                    });

                    response.SuccessData.Add($"{roomName}/{j} added!");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error saving room data");
                response.FailureData.Add($"{roomName}: {ex.Message}");
            }
        }

        return (result, response);
    }
    private (dynamic?, BulkResponse) CreateFloorDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        var name = row[0]?.ToString();
        var desc = row[1]?.ToString();
        var towerName = row[2]?.ToString();

        // Get Tower
        var tower = GetModuleDetails("Plan", "Name", towerName, "tower", 0);
        if (tower == null)
        {
            response.FailureData.Add($"{name}: Tower not found!");
            return (null, response);
        }

        // Duplicate Check
        if (GetModuleDetails("Plan", "Name", name, "floor", 0) != null)
        {
            response.FailureData.Add($"{name}: Already exists!");
            return (null, response);
        }

        response.SuccessData.Add($"{name} added!");

        return (new Plan
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "floor",
            Name = name,
            Description = desc,
            ProjectId = tower.ProjectId,
            ParentId = tower.Id
        }, response);
    }
    private (dynamic?, BulkResponse) CreateFlatDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        var name = row[0]?.ToString();
        var desc = row[1]?.ToString();
        var floorName = row[2]?.ToString();
        var towerName = row[3]?.ToString();

        // Get Tower
        var tower = GetModuleDetails("Plan", "Name", towerName, "tower", 0);
        if (tower == null)
        {
            response.FailureData.Add($"{name}: Tower not found!");
            return (null, response);
        }

        // Get Floor
        var floor = GetModuleDetails("Plan", "Name", floorName, "floor", (long)tower.Id);
        if (floor == null)
        {
            response.FailureData.Add($"{name}: Floor not found!");
            return (null, response);
        }

        // Duplicate Check
        if (GetModuleDetails("Plan", "Name", name, "flat", 0) != null)
        {
            response.FailureData.Add($"{name}: Already exists!");
            return (null, response);
        }

        response.SuccessData.Add($"{name} added!");

        return (new Plan
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "flat",
            Name = name,
            Description = desc,
            ProjectId = floor.ProjectId,
            ParentId = floor.Id
        }, response);
    }
    private (dynamic?, BulkResponse) CreateTowerDataModel(DataRow row, string member, string key, BulkResponse response)
    {
        var name = row[0]?.ToString();
        var desc = row[1]?.ToString();
        var projectName = row[2]?.ToString();

        var project = GetModuleDetails("Project", "Name", projectName, null, 0);
        if (project == null)
        {
            response.FailureData.Add($"{name}: Project not found!");
            return (null, response);
        }

        if (GetModuleDetails("Plan", "Name", name, "tower", 0) != null)
        {
            response.FailureData.Add($"{name}: Already exists!");
            return (null, response);
        }

        response.SuccessData.Add($"{name} added!");

        return (new Plan
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "tower",
            Name = name,
            Description = desc,
            ProjectId = project.Id
        }, response);
    }
    private dynamic? GetModuleDetails(string model, string name, string? value, string? type, long id)
    {
        ListOptions option = new();
        Condition con = new()
        {
            //Operator blank mean Equality
            Name = name,
            Value = value
        };
        if (type != null)
        {
            var typecon = new Condition()
            {
                Name = "Type",
                Value = type,
            };
            con.And = typecon;
            if (id > 0)
            {
                var newcon = new Condition()
                {
                    Name = type == "RoomType" ? "PlanId" : "ParentId",
                    Value = id,
                };
                typecon.And = newcon;
            }
        }


        option.SearchCondition = con;
        var data = dataService.Get(model, option);

        if (data != null && data?.Items.Count > 0)
        {
            return data.Items[0];
        }
        else
        {
            logger.LogError("No data retrive from backend for " + model + "  name:" + value);
            return null;
        }
    }

    private static string GetCellValue(SpreadsheetDocument document, Cell cell)
    {
        SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
        string value = cell.CellValue.InnerXml;

        if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
        {
            return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
        }
        else
        {
            return value;
        }
    }

    private static bool CheckedTemplateAccordingtoModule(string fileName, string module)
    {
        if (string.IsNullOrWhiteSpace(fileName) || string.IsNullOrWhiteSpace(module))
            return false;

        var map = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
                    {
                        { "TOWERDETAILS", "TOWER" },
                        { "FLOORDETAILS", "FLOOR" },
                        { "FLATDETAILS", "FLAT" },
                        { "PROJECTDETAILS", "PROJECT" },
                        { "ROOMTYPEDETAILS", "ROOMTYPE" },
                        { "UOMDETAILS", "UOM" },
                        { "ITEMTYPEDETAILS", "ITEMTYPE" },
                        { "ITEMGROUPDETAILS", "ITEMGROUP" },
                        { "OUTSIDEENTITYTYPEDETAILS", "OUTSIDEENTITYTYPE" },
                        { "PARKINGTYPEDETAILS", "PARKINGTYPE" },
                        { "CONTRACTORDETAILS", "CONTRACTOR" },
                        { "SUPPLIERDETAILS", "SUPPLIER" },
                        { "ITEMDETAILS", "ITEM" },
                        { "FLATTEMPLATEDETAILS", "FLATTEMPLATE" },
                        { "PARKINGDETAILS", "PARKING" },
                        { "OUTSIDEENTITYDETAILS", "OUTSIDEENTITY" }
                    };

        return map.TryGetValue(fileName, out var expectedModule) &&
               expectedModule.Equals(module, StringComparison.OrdinalIgnoreCase);
    }
}