using Azure;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Wordprocessing;
using ILab.Data;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.X509;
using RajApi.Data;
using RajApi.Data.Models;
using System.Data;
using System.Security.Principal;
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
                string? model = GetModelName(dataModel);
                if (model == null)
                {
                    logger.LogError("File Name :" + dataModel + " is not found");
                    response.FailureData?.Add("File Name :" + dataModel + " is not found");
                    return response;
                }
                // Save DataTable to database
                if (dt.Rows.Count > 0)
                    response = await SaveToDatabase(model, dt, response, token);
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

    private string? GetModelName(string module)
    {
        var preMapping = new Dictionary<string, string>
        {
            ["FlatDetails"] = "FLAT",
            ["TowerDetails"] = "TOWER",
            ["FloorDetails"] = "FLOOR",
            ["ProjectDetails"] = "PROJECT",
            ["Room TypeDetails"] = "ROOMTYPE",
            ["UOMDetails"] = "UOM",
            ["Item TypeDetails"] = "ASSETTYPE",
            ["Item GroupDetails"] = "ASSETGROUP",
            ["Outside Entity TypeDetails"] = "OUTSIDEENTITYTYPE",
            ["Parking TypeDetails"] = "PARKINGTYPE",
            ["Contractor MasterDetails"] = "CONTRACTOR",
            ["Supplier MasterDetails"] = "SUPPLIER",
            ["Item MasterDetails"] = "ASSET",
            ["Flat TemplateDetails"] = "FLATTEMPLATE",
            ["Tower ParkingDetails"] = "PARKING",
            ["Outside Entity MappingDetails"] = "OUTSIDEENTITY"
        };

        return preMapping.TryGetValue(module, out string? value) ? value : null;
    }

    private async Task<BulkResponse> SaveToDatabase(string dataModel, DataTable dataTable, BulkResponse response, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);
            switch (dataModel)
            {
                case "TOWER":
                    response = await SaveTowerData(dataTable, member, key, response, token);
                    break;
                case "FLOOR":
                    response = await SaveFloorData(dataTable, member, key, response, token);
                    break;
                case "FLAT":
                    response = await SaveFlatData(dataTable, member, key, response, token);
                    break;
                case "FLATTEMPLATE":
                    response = await SaveFlatTemplateData(dataTable, member, key, response, token);
                    break;
                case "ASSET":
                    response = await SaveAssetData(dataTable, member, key, response, token);
                    break;
                case "PROJECT":
                    response = await SaveProjectData(dataTable, member, key, response, token);
                    break;
                case "OUTSIDEENTITY":
                    response = await SaveOutSideEntityData(dataTable, member, key, response, token);
                    break;
                case "PARKING":
                    response = await SaveParkingData(dataTable, member, key, response, token);
                    break;
                case "CONTRACTOR":
                    response = await SaveContractorData(dataTable, member, key, response, token);
                    break;
                case "SUPPLIER":
                    response = await SaveSupplierData(dataTable, member, key, response, token);
                    break;
                case "UOM":
                    response = await SaveUOMdata(dataTable, member, key, response, token);
                    break;
                case "ASSETTYPE":
                    response = await SaveAssetTypeData(dataTable, member, key, response, token);
                    break;
                case "ASSETGROUP":
                    response = await SaveAssetGroupData(dataTable, member, key, response, token);
                    break;
                case "ROOMTYPE":
                    response = await SaveRoomTypeData(dataTable, member, key, response, token);
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

    #region Save Module wise Bulk data
    private async Task<BulkResponse> SaveRoomTypeData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<RoomType>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var desc = row["Description"]?.ToString();
                var code = row["Alias"]?.ToString();

                // Duplicate Check
                if (await GetDynamicDetails("RoomType", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new RoomType
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc,
                    Code = code
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("RoomType", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving RoomType data");
            response.FailureData.Add($"Error saving RoomType data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveAssetGroupData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<AssetGroup>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var code = row["Alias"]?.ToString();

                // Duplicate Check
                if (await GetDynamicDetails("AssetGroup", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new AssetGroup
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = code
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("AssetGroup", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving AssetGroup data");
            response.FailureData.Add($"Error saving AssetGroup data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveAssetTypeData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<AssetType>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var code = row["Alias"]?.ToString();

                // Duplicate Check
                if (await GetDynamicDetails("AssetType", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new AssetType
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = code
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("AssetType", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving AssetType data");
            response.FailureData.Add($"Error saving AssetType data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveUOMdata(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Uom>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var code = row["Alias"]?.ToString();

                // Duplicate Check
                if (await GetDynamicDetails("Uom", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Uom
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = code
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Uom", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Uom data");
            response.FailureData.Add($"Error saving Uom data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveSupplierData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Supplier>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var code = row["Alias"]?.ToString();
                var address1 = row["Address 1"]?.ToString();
                var phone = row["Phone"]?.ToString();
                var pan = row["PAN"]?.ToString();
                var gst = row["GST"]?.ToString();
                var licenceNo = row["Licence No"]?.ToString();
                var spoc = row["SPOC"]?.ToString();
                DateTime? effectiveStartDate = DateTime.TryParse(row["Effective Start Date"]?.ToString(), out var start)
                        ? start : null;

                DateTime? effectiveEndDate = DateTime.TryParse(row["Effective End Date"]?.ToString(), out var end)
                    ? end : null;
                // Duplicate Check
                if (await GetDynamicDetails("Supplier", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Supplier
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = code,
                    Address = address1,
                    EffectiveEndDate = effectiveEndDate,
                    EffectiveStartDate = effectiveStartDate,
                    GSTNo = gst,
                    LicenceNo = licenceNo,
                    PanNo = pan,
                    PhoneNumber = phone,
                    SPOC = spoc
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Supplier", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Supplier data");
            response.FailureData.Add($"Error saving Supplier data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveContractorData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Contractor>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var code = row["Alias"]?.ToString();
                var address1 = row["Address 1"]?.ToString();
                var phone = row["Phone"]?.ToString();
                var pan = row["PAN"]?.ToString();
                var gst = row["GST"]?.ToString();
                var licenceNo = row["Licence No"]?.ToString();
                var spoc = row["SPOC"]?.ToString();
                DateTime? effectiveStartDate = DateTime.TryParse(row["Effective Start Date"]?.ToString(), out var start)
                        ? start : null;

                DateTime? effectiveEndDate = DateTime.TryParse(row["Effective End Date"]?.ToString(), out var end)
                    ? end : null;

                // Duplicate Check
                if (await GetDynamicDetails("Contractor", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Contractor
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = code,
                    Address = address1,
                    EffectiveEndDate = effectiveEndDate,
                    EffectiveStartDate = effectiveStartDate,
                    GSTNo = gst,
                    LicenceNo = licenceNo,
                    PanNo = pan,
                    PhoneNumber = phone,
                    SPOC = spoc,
                    Type = "Contractor"
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Contractor", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Contractor data");
            response.FailureData.Add($"Error saving Contractor data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveFlatData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Plan>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var desc = row["Description"]?.ToString();
                var floorName = row["Floor"]?.ToString();

                // Get Floor
                var floor = await GetDynamicDetails("Plan", floorName, "floor");
                if (floor == null)
                {
                    response.FailureData.Add($"{name}: Floor is not found!");
                    continue;
                }

                // Duplicate Check
                if (await GetDynamicDetails("Plan", name, "flat") != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }
                // Get Floor full Details
                var floorDetails = await dataService.Get("Plan", floor.Id);
                response.SuccessData.Add($"{name} added!");

                list.Add(new Plan
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc,
                    Type = "flat",
                    ProjectId = floorDetails.ProjectId,
                    ParentId = floorDetails.Id,
                    PriorityStatus = PriorityStatusType.Normal
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Plan", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Flat data");
            response.FailureData.Add($"Error saving Flat data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveFloorData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Plan>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var desc = row["Description"]?.ToString();
                var towerName = row["Tower"]?.ToString();

                // Get Tower
                var tower = await GetDynamicDetails("Plan", towerName, "tower");
                if (tower == null)
                {
                    response.FailureData.Add($"{name}: Tower is not found!");
                    continue;
                }

                // Duplicate Check
                if (await GetDynamicDetails("Plan", name, "floor") != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                // Get Tower full Details
                var towerDetails = await dataService.Get("Plan", tower.Id);
                response.SuccessData.Add($"{name} added!");

                list.Add(new Plan
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc,
                    Type = "floor",
                    ProjectId = towerDetails.ProjectId,
                    ParentId = towerDetails.Id
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Plan", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Floor data");
            response.FailureData.Add($"Error saving Floor data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveTowerData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"].ToString();
                var projectName = row["Project"].ToString();
                var desc = row["Description"]?.ToString();
                var floorCount = row["Floor Count"]?.ToString();

                // Get Project
                var project = await GetDynamicDetails("Project", projectName, null);
                if (project == null)
                {
                    response.FailureData.Add($"{projectName}: Project is not found!");
                    continue;
                }

                // Duplicate Check
                var plans = await GetDynamicDetails("Plan", name, "tower");
                if (plans != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                var plan = new Plan
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc,
                    Type = "tower",
                    ProjectId = project.Id
                };
                long planId = await dataService.SaveDataAsync("Plan", plan, token);
                if (floorCount != null)
                {
                    // Get Project full Details
                    var projectDetails = await dataService.Get("Project", project.Id);
                    int count = Convert.ToInt32(floorCount);
                    response= await SaveBulkFloorData(count, planId, name, projectDetails, member, key, response,token);
                }
                if (row.Table.Columns.Count <= 4)
                {
                    response.FailureData.Add("No Parking exist in the excelsheet!");
                }

                var list = new List<Parking>();
                for (int i = 4; i < row.Table.Columns.Count; i++)
                {
                    var parkingTypeName = row.Table.Columns[i].ToString();
                    var value = row[i]?.ToString();

                    if (string.IsNullOrWhiteSpace(value))
                    {
                        response.FailureData.Add($"{parkingTypeName}: value is blank!");
                        continue;
                    }

                    if (!int.TryParse(value, out int quantity) || quantity <= 0)
                        continue;

                    // Get Parking Type
                    var parkingType = await GetDynamicDetails("ParkingType", parkingTypeName, null);
                    if (parkingType == null)
                    {
                        response.FailureData.Add($"{parkingTypeName}: Parking Type is not found!");
                        continue;
                    }
                    string oldName = projectName + "/" + name + "/Parking/" + parkingType.Name;

                    var maxCount = dataService.GetMaxCount("Parking", "Name", oldName);
                    for (int j = 1; j <= quantity; j++)
                    {
                        var parkinName = $"{oldName}-{maxCount + j}";

                        list.Add(new Parking
                        {
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = member,
                            Key = key,
                            ParkingTypeId = parkingType.Id,
                            TowerId = planId,
                            ProjectId = project.Id,
                            Name = parkinName,
                        });
                        response.SuccessData.Add($"{parkinName} added!");
                    }
                }
                if (list.Any())
                    await dataService.SaveBulkkDataAsync("Parking", list, token);
            }
            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving SaveTowerData data");
            response.FailureData.Add("Error saving SaveTowerData data");
            return response;
        }
    }
    private async Task<BulkResponse> SaveBulkFloorData(int floorCount, long towerId, string towerName, Project project, string member, string key, 
        BulkResponse response, CancellationToken token)
    {
        try
        {
            List<Plan> listplan = new();
            for (int i = 0; i < floorCount; i++)
            {
                string floorName = string.Empty, description = string.Empty;
                if (i == 0)
                {
                    floorName = project.Code + "/" + towerName + "/FloorG";
                    description = project.Name + "/" + towerName + "/FloorG";
                }
                else
                {
                    floorName = project.Code + "/" + towerName + "/Floor" + i;
                    description = project.Name + "/" + towerName + "/Floor" + i;
                }
                Plan plan = new()
                {
                    Status = StatusType.Draft,
                    Date = DateTime.UtcNow,
                    Member = member,
                    Key = key,
                    Type = "floor",
                    Name = floorName,
                    Description = description,
                    ParentId = towerId,
                    ProjectId = project.Id,
                    Blueprint = null,
                    PriorityStatus = PriorityStatusType.Normal,
                };
                response.SuccessData.Add($"{floorName} added!");
                listplan.Add(plan);
            }
            await dataService.SaveBulkkDataAsync("Plan", listplan, token);
            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveBulkFloorData method and details: '{ex.Message}'");
            response.FailureData.Add("Error saving SaveBulkFloorData data");
            return response;
        }

    }

    private async Task<BulkResponse> SaveProjectData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Project>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var alias = row["Alias"]?.ToString();
                var startFinYear = row["Start Fin Year"]?.ToString();
                var plannedStartDate = row["Planned Start Date"]?.ToString();
                var plannedEndDate = row["Planned End Date"]?.ToString();
                var completionCertificateDate = row["Completion Certificate Date"]?.ToString();
                var belongsTo = row["Belongs To"]?.ToString();
                var zone = row["Zone"]?.ToString();
                var address1 = row["Address 1"]?.ToString();
                var address2 = row["Address 2"]?.ToString();
                var address3 = row["Address 3"]?.ToString();
                var country = row["Country"]?.ToString();
                var state = row["State"]?.ToString();
                var city = row["City"]?.ToString();
                var pin = row["PIN"]?.ToString();
                var latitude = row["Latitude"]?.ToString();
                var longitude = row["Longitude"]?.ToString();
                var phone = row["Phone"]?.ToString();
                var contactName = row["Contact Name"]?.ToString();

                // Get Company
                var company = await GetDynamicDetails("Company", belongsTo, null);
                if (company == null)
                {
                    response.FailureData.Add($"{name}: Company is not found!");
                    continue;
                }

                // Duplicate Check
                var projects = await GetDynamicDetails("Project", name, null);
                if (projects != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Project
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = alias,
                    StartFinYear = startFinYear,
                    PlanStartDate = plannedStartDate != null ? Convert.ToDateTime(plannedStartDate) : null,
                    PlanEndDate = plannedEndDate != null ? Convert.ToDateTime(plannedEndDate) : null,
                    CompletionCertificateDate = completionCertificateDate != null ? Convert.ToDateTime(completionCertificateDate) : null,
                    CompanyName = company.Name,
                    CompanyId = company.Id,
                    Zone = zone,
                    Address1 = address1,
                    Address2 = address2,
                    Address3 = address3,
                    City = city,
                    Country = country,
                    State = state,
                    PhoneNumber = phone,
                    PinCode = pin != null ? Convert.ToInt32(pin) : null,
                    Latitude = latitude != null ? Convert.ToInt32(latitude) : null,
                    Longitude = longitude != null ? Convert.ToInt32(longitude) : null,
                    ContactName = contactName
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Project", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Project data");
            response.FailureData.Add($"Error saving Project data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveAssetData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Asset>();
            foreach (DataRow row in dt.Rows)
            {
                var groupName = row["Group"]?.ToString();
                var typeName = row["Type"]?.ToString();
                var name = row["Name"]?.ToString();
                var alias = row["Alias"]?.ToString();
                var uomName = row["UOM"]?.ToString();

                // Get Asset Group
                var assetGroup = await GetDynamicDetails("AssetGroup", groupName, null);
                if (assetGroup == null)
                {
                    response.FailureData.Add($"{groupName}: Item Group is not found!");
                    continue;
                }

                // Get Asset Type
                var assetType = await GetDynamicDetails("AssetType", typeName, null);
                if (assetType == null)
                {
                    response.FailureData.Add($"{typeName}: Item Type is not found!");
                    continue;
                }

                // Get UOM
                var uom = await GetDynamicDetails("Uom", uomName, null);
                if (uom == null)
                {
                    response.FailureData.Add($"{uomName}: UOM is not found!");
                    continue;
                }

                // Duplicate Check
                var Assets = await GetDynamicDetails("Asset", name, null);
                if (Assets != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Asset
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Code = alias,
                    GroupId = assetGroup.Id,
                    TypeId = assetType.Id,
                    UomId = uom.Id
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Asset", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            response.FailureData.Add("Error saving Items data");
            return response;
        }
    }

    private async Task<dynamic> GetDynamicDetails(string model, string value, string? type)
    {
        var query = string.Empty;
        switch (model)
        {
            case "Uom":
            case "Project":
            case "ParkingType":
            case "AssetType":
            case "Asset":
            case "AssetGroup":
            case "Company":
                query = "SELECT TOP 1 Id,Name FROM " + model + "s  WHERE NAME = '" + value + "'";
                break;
            case "Plan":
                query = "SELECT TOP 1 Id,Name FROM Plans  WHERE Type=" + type + " and NAME = '" + value + "'";
                break;
        }
        var data = await Task.Run(() => dataService.GetDynamicData(query));

        if (data != null && data?.Count > 0)
        {
            return data[0];
        }
        else
        {
            return null;
        }
    }

    private async Task<BulkResponse> SaveParkingData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            var list = new List<Parking>();
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var projectName = row["Project"]?.ToString();
                var towerName = row["Tower"]?.ToString();
                var parkingtypeName = row["Parking Type"]?.ToString();
                // Get Project
                var project = await GetDynamicDetails("Project", projectName, null);
                if (project == null)
                {
                    response.FailureData.Add($"{name}: Project is not found!");
                    continue;
                }

                // Get Tower
                var tower = await GetDynamicDetails("Plan", towerName, "tower");
                if (tower == null)
                {
                    response.FailureData.Add($"{name}: Tower is not found!");
                    continue;
                }

                // Get Parking Type
                var parkingType = await GetDynamicDetails("ParkingType", parkingtypeName, null);
                if (parkingType == null)
                {
                    response.FailureData.Add($"{name}: Parking Type is not found!");
                    continue;
                }

                // Duplicate Check
                if (await GetDynamicDetails("Parking", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Parking
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    ProjectId = project.Id,
                    TowerId = tower.Id,
                    ParkingTypeId = parkingType.Id
                });
            }
            if (list.Any())
                await dataService.SaveBulkkDataAsync("Parking", list, token);

            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving Parking data");
            response.FailureData.Add($"Error saving Parking data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveOutSideEntityData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {

            foreach (DataRow row in dt.Rows)
            {
                var projectName = row["Project"].ToString();
                var towerName = row["Tower"]?.ToString();
                var floorName = row["Floor"]?.ToString();

                // Get Project
                var project = await GetDynamicDetails("Project", projectName, null);
                if (project == null)
                {
                    response.FailureData.Add($"{projectName}: Project is not found!");
                    continue;
                }

                // Get Tower
                var tower = await GetDynamicDetails("Plan", towerName, "tower");
                if (tower == null)
                {
                    response.FailureData.Add($"{towerName}: Tower is not found!");
                    continue;
                }

                // Get Floor
                var floor = await GetDynamicDetails("Plan", floorName, "floor");
                if (floor == null)
                {
                    response.FailureData.Add($"{floorName}: Floor is not found!");
                }

                if (row.Table.Columns.Count <= 3)
                {
                    response.FailureData.Add("No OutSide Entity Type exist in the excelsheet!");
                }

                var list = new List<OutSideEntity>();
                for (int i = 3; i < row.Table.Columns.Count; i++)
                {
                    var outSideEntityTypeName = row.Table.Columns[i].ToString();
                    var value = row[i]?.ToString();

                    if (string.IsNullOrWhiteSpace(value))
                    {
                        response.FailureData.Add($"{outSideEntityTypeName}: value is blank!");
                        continue;
                    }

                    if (!int.TryParse(value, out int quantity) || quantity <= 0)
                        continue;

                    // Get OutSide Entity Type
                    var outSideEntityType = await GetDynamicDetails("OutSideEntityType", outSideEntityTypeName, null);
                    if (outSideEntityType == null)
                    {
                        response.FailureData.Add($"{outSideEntityTypeName}: OutSide Entity Type is not found!");
                        continue;
                    }
                    string locationPrefix = projectName + "/";

                    if (tower != null)
                        locationPrefix += tower.Name + "/";

                    if (floor != null)
                        locationPrefix += floor.Name + "/";

                    var oldName = $"{locationPrefix}{outSideEntityType.Name}";

                    var maxCount = dataService.GetMaxCount("OutSideEntity", "Name", oldName);
                    for (int j = 1; j <= quantity; j++)
                    {
                        var name = $"{oldName}-{maxCount + j}";

                        list.Add(new OutSideEntity
                        {
                            Status = StatusType.Draft,
                            Date = DateTime.UtcNow,
                            Member = member,
                            Key = key,
                            OutSideEntityTypeId = outSideEntityType.Id,
                            TowerId = tower != null ? tower.Id : null,
                            FloorId = floor != null ? floor.Id : null,
                            ProjectId = project.Id,
                            Name = name
                        });
                        response.SuccessData.Add($"{name} added!");
                    }
                }
                if (list.Any())
                    await dataService.SaveBulkkDataAsync("OutSideEntity", list, token);
            }


            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error saving OutSideEntity data");
            response.FailureData.Add("Error saving OutSideEntity data");
            return response;
        }
    }

    private async Task<BulkResponse> SaveFlatTemplateData(DataTable dt, string member, string key, BulkResponse response, CancellationToken token)
    {
        try
        {
            foreach (DataRow row in dt.Rows)
            {
                var name = row["Name"]?.ToString();
                var desc = row["Description"]?.ToString();

                // Duplicate Check
                if (await GetDynamicDetails("FlatTemplate", name, null) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    continue;
                }

                response.SuccessData.Add($"{name} added!");

                var template = new FlatTemplate
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc
                };

                long templateId = await dataService.SaveDataAsync("FlatTemplate", template, token);

                if (row.Table.Columns.Count <= 2)
                {
                    response.FailureData.Add("No OutSide Entity Type exist in the excelsheet!");
                }

                var list = new List<FlatTemplateDetails>();
                for (int i = 2; i < row.Table.Columns.Count; i++)
                {
                    var roomTypeName = row.Table.Columns[i].ToString();
                    var value = row[i]?.ToString();

                    if (string.IsNullOrWhiteSpace(value))
                    {
                        response.FailureData.Add($"{roomTypeName}: value is blank!");
                        continue;
                    }

                    if (!int.TryParse(value, out int quantity) || quantity <= 0)
                        continue;
                    // Get Room Type
                    var RoomType = await GetDynamicDetails("RoomType", roomTypeName, null);
                    if (RoomType == null)
                    {
                        response.FailureData.Add($"{roomTypeName}: Room Type is not found!");
                        continue;
                    }

                    list.Add(new FlatTemplateDetails
                    {
                        Status = StatusType.Draft,
                        Date = DateTime.UtcNow,
                        Member = member,
                        Key = key,
                        FlatTemplateId = templateId,
                        RoomTypeId = RoomType.Id,
                        RoomCount = quantity
                    });
                }
                if (list.Any())
                    await dataService.SaveBulkkDataAsync("FlatTemplateDetails", list, token);
            }
            return response;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, ex.Message);
            response.FailureData.Add("Error saving FlatTemplate data");
            return response;
        }
    }

    #endregion

    private async Task<dynamic?> GetModuleDetails(string model, string name, string? value, string? type, long id)
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


        //option.SearchCondition = con;
        var query = "SELECT TOP 1 ID,NAME FROM ASSETGROUPS  WHERE NAME = '" + value + "'";
        var data = await Task.Run(() => dataService.GetDynamicData(query));

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
                        { "Room TypeDetails", "Room Type" },
                        { "UOMDETAILS", "UOM" },
                        { "Item TypeDetails", "Item Type" },
                        { "Item GroupDetails", "Item Group" },
                        { "Outside Entity TypeDetails", "Outside Entity Type" },
                        { "Parking TypeDetails", "Parking Type" },
                        { "Contractor MasterDetails", "Contractor Master" },
                        { "Supplier MasterDetails", "Supplier Master" },
                        { "Item MasterDetails", "Item Master" },
                        { "Flat TemplateDetails", "Flat Template" },
                        { "Tower ParkingDetails", "Tower Parking" },
                        { "Outside Entity MappingDetails", "Outside Entity Mapping" }
                    };

        return map.TryGetValue(fileName, out var expectedModule) &&
               expectedModule.Equals(module, StringComparison.OrdinalIgnoreCase);
    }
}