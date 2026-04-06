using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;

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

    private async Task<BulkResponse> SaveToDatabase(string dataModel, DataTable dataTable, BulkResponse response, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;

            switch (dataModel.ToUpper())
            {
                case "TOWERDETAILS":
                case "FLOORDETAILS":
                case "FLATTEMPLATEDETAILS":
                case "OUTSIDEENTITYDETAILS":
                    response = await SaveRowWiseData(dataModel, dataTable, member, key, response, token);
                    break;
                case "FLATDETAILS":
                case "PROJECTDETAILS":
                case "ROOMTYPEDETAILS":
                case "CONTRACTORDETAILS":
                case "SUPPLIERDETAILS":
                case "ITEMDETAILS":
                case "PARKINGDETAILS":
                case "UOMDETAILS":
                case "ASSETTYPEDETAILS":
                case "ASSETGROUPDETAILS":
                    response = await SaveBulkData(dataModel, dataTable, member, key, response, token);
                    break;
            }

        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
            response.FailureData?.Add(ex.Message);
        }
        return response;
    }

    private async Task<BulkResponse> SaveBulkData(string dataModel, DataTable dataTable, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            dataService.Identity = new ModuleIdentity(member, key);

            var handlers = new Dictionary<string, Func<Task<BulkResponse>>>(StringComparer.OrdinalIgnoreCase)
            {
                ["UOMDETAILS"] = () => SaveBulkDataGeneric<Uom>(dataTable, member, key, response, "Uom", token),
                ["ASSETTYPEDETAILS"] = () => SaveBulkDataGeneric<AssetType>(dataTable, member, key, response, "AssetType", token),
                ["ASSETGROUPDETAILS"] = () => SaveBulkDataGeneric<AssetGroup>(dataTable, member, key, response, "AssetGroup", token),
                ["OUTSIDEENTITYTYPEDETAILS"] = () => SaveBulkDataGeneric<AssetType>(dataTable, member, key, response, "OutSideEntityType", token),
                ["PARKINGTYPEDETAILS"] = () => SaveBulkDataGeneric<AssetGroup>(dataTable, member, key, response, "ParkingType", token),
                ["CONTRACTORDETAILS"] = () => SaveBulkDataGeneric<Contractor>(dataTable, member, key, response, "Contractor", token)
            };

            if (handlers.TryGetValue(dataModel, out var handler))
            {
                return await handler();
            }

            response.FailureData?.Add($"Invalid data model: {dataModel}");
            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in SaveBulkData");
            response.FailureData?.Add(ex.Message);
            return response;
        }
    }

    private async Task<BulkResponse> SaveBulkDataGeneric<TEntity>(DataTable dataTable, string member, string key, BulkResponse response,
    string moduleName, CancellationToken token) where TEntity : class
    {
        try
        {
            var list = new List<TEntity>();
            var now = DateTime.Now;

            foreach (DataRow row in dataTable.Rows)
            {
                (var entity, response) = CreateSimpleDataModel(
                    row,
                    member,
                    response,
                    moduleName,
                    (r, m) => CreateEntity<TEntity>(r, m, key, now)
                );

                if (entity != null)
                    list.Add(entity);
            }

            if (list.Any())
                await dataService.SaveBulkkDataAsync(moduleName, list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Error in SaveBulk{moduleName}Data");
            response.FailureData?.Add(ex.Message);
            return response;
        }
    }

    private TEntity CreateEntity<TEntity>(DataRow row, string member, string key, DateTime now) where TEntity : class
    {
        return typeof(TEntity).Name switch
        {
            nameof(Uom) => new Uom
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(AssetType) => new AssetType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(AssetGroup) => new AssetGroup
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(OutSideEntityType) => new OutSideEntityType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(ParkingType) => new ParkingType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            // ✅ NEW: Contractor समर्थन
            nameof(Contractor) => new Contractor
            {
                Name = row["Name"]?.ToString(),
                Code = row["Code"]?.ToString(),
                PhoneNumber = row["PhoneNumber"]?.ToString(),
                Address = row["Address"]?.ToString(),
                PanNo = row["PanNo"]?.ToString(),
                GSTNo = row["GSTNo"]?.ToString(),
                LicenceNo = row["LicenceNo"]?.ToString(),
                SPOC = row["SPOC"]?.ToString(),
                Type = row["Type"]?.ToString() ?? throw new Exception("Type is required"),

                EffectiveStartDate = DateTime.TryParse(row["EffectiveStartDate"]?.ToString(), out var start)
                    ? start : null,

                EffectiveEndDate = DateTime.TryParse(row["EffectiveEndDate"]?.ToString(), out var end)
                    ? end : null,

                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            _ => throw new NotSupportedException($"Type {typeof(TEntity).Name} not supported")
        };
    }
    
    private (TEntity?, BulkResponse) CreateSimpleDataModel<TEntity>(DataRow row, string member, BulkResponse response, string moduleName,
    Func<DataRow, string, TEntity> factory) where TEntity : class
    {
        var name = row["Name"]?.ToString();

        if (string.IsNullOrWhiteSpace(name))
        {
            response.FailureData.Add("Name is required!");
            return (null, response);
        }

        if (GetModuleDetails(moduleName, "Name", name, null, 0) != null)
        {
            response.FailureData.Add($"{name}: Already exists!");
            return (null, response);
        }

        response.SuccessData.Add($"{name} added!");
        return (factory(row, member), response);
    }

    private async Task<BulkResponse> SaveRowWiseData(string dataModel, DataTable dataTable, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            dataService.Identity = new ModuleIdentity(member, key);
            string model = dataModel.ToUpper();

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var dataRow = dataTable.Rows[i];
                dynamic? data = null;
                switch (model)
                {
                    case "TOWERDETAILS":
                        (data, response) = CreateTowerDataModel(dataRow, member, key, response);
                        break;
                    case "FLOORDETAILS":
                        (data, response) = CreateFloorDataModel(dataRow, member, key, response);
                        break;
                    case "FLATTEMPLATEDETAILS":
                        (data, response) = CreateFlatDataModel(dataRow, member, key, response);
                        break;
                    case "OUTSIDEENTITYDETAILS":
                        (data, response) = CreateFlatDataModel(dataRow, member, key, response);
                        break;
                }

                if (data != null)
                {
                    long planId = await dataService.SaveDataAsync("Plan", data, token);
                    if (planId > 0 && model.Equals("TOWERDETAILS"))
                    {
                        (data, response) = CreateRoomDetailsDataModel(dataRow, planId, member, key, response);
                        if (data != null)
                        {
                            foreach (RoomDetails item in data)
                            {
                                await dataService.SaveDataAsync("RoomDetails", item, token);
                            }
                        }
                    }
                    if (planId > 0 && model.Equals("FLOORDETAILS"))
                    {
                        (data, response) = CreateRoomDetailsDataModel(dataRow, planId, member, key, response);
                        if (data != null)
                        {
                            foreach (RoomDetails item in data)
                            {
                                await dataService.SaveDataAsync("RoomDetails", item, token);
                            }
                        }
                    }
                }
            }
            return response;
        }
        catch (Exception)
        {

            throw;
        }
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