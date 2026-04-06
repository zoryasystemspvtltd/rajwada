using Azure;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Data;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
                    response = await SaveTowerData(dataTable, member, key, response, token);
                    break;
                case "FLOORDETAILS":
                    response = await SaveFloorData(dataTable, member, key, response, token);
                    break;
                case "FLATDETAILS":
                    response = await SaveFlatData(dataTable, member, key, response, token);
                    break;
                case "FLATTEMPLATEDETAILS":
                    response = await SaveFlatTemplateData(dataTable, member, key, response, token);
                    break;
                case "ASSETDETAILS":
                    response = await SaveAssetData(dataTable, member, key, response, token);
                    break;
                case "PROJECTDETAILS":
                    response = await SaveProjectData(dataTable, member, key, response, token);
                    break;
                case "OUTSIDEENTITYDETAILS":
                    response = await SaveOutSideEntityData(dataTable, member, key, response, token);
                    break;
                case "PARKINGDETAILS":
                    response = await SaveParkingData(dataTable, member, key, response, token);
                    break;
                case "CONTRACTORDETAILS":
                case "SUPPLIERDETAILS":
                case "UOMDETAILS":
                case "ASSETTYPEDETAILS":
                case "ASSETGROUPDETAILS":
                case "ROOMTYPEDETAILS":
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

   


    #region "Bulk Data Save Methods"
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
                ["ROOMTYPEDETAILS"] = () => SaveBulkDataGeneric<AssetGroup>(dataTable, member, key, response, "RoomType", token),
                ["CONTRACTORDETAILS"] = () => SaveBulkDataGeneric<Contractor>(dataTable, member, key, response, "Contractor", token),
                ["SUPPLIERDETAILS"] = () => SaveBulkDataGeneric<Contractor>(dataTable, member, key, response, "Supplier", token)
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
                Code = row["Alias"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(AssetType) => new AssetType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(AssetGroup) => new AssetGroup
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(OutSideEntityType) => new OutSideEntityType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            nameof(ParkingType) => new ParkingType
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
                Member = member,
                Key = key,
                Date = now
            } as TEntity,

            // ✅ NEW: Contractor समर्थन
            nameof(Contractor) => new Contractor
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
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

            // ✅ NEW: Supplier समर्थन
            nameof(Supplier) => new Supplier
            {
                Name = row["Name"]?.ToString(),
                Code = row["Alias"]?.ToString(),
                PhoneNumber = row["Phone"]?.ToString(),
                Address = row["Address 1"]?.ToString(),
                PanNo = row["PAN"]?.ToString(),
                GSTNo = row["GST"]?.ToString(),
                LicenceNo = row["Licence No"]?.ToString(),
                SPOC = row["SPOC"]?.ToString(),
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

    #endregion


    #region Save Module wise Bulk data

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
                var PriorityName = row["Priority"]?.ToString();
                // Get Floor
                var floor = GetModuleDetails("Plan", "Name", floorName, "floor", 0);
                if (floor == null)
                {
                    response.FailureData.Add($"{name}: Floor is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Plan", "Name", name, "flat", 0) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    return response;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Plan
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description = desc,
                    Type = "flat",
                    ProjectId = floor.ProjectId,
                    ParentId = floor.Id,
                    //PriorityStatus=
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
                var tower = GetModuleDetails("Plan", "Name", towerName, "tower", 0);
                if (tower == null)
                {
                    response.FailureData.Add($"{name}: Tower is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Plan", "Name", name, "floor", 0) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    return response;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Plan
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    Description=desc,
                    Type = "floor",
                    ProjectId = tower.ProjectId,
                    ParentId = tower.Id
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
                var project = GetModuleDetails("Project", "Name", projectName, null, 0);
                if (project == null)
                {
                    response.FailureData.Add($"{projectName}: Project is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Plan", "Name", name, "tower", 0) != null)
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
                    int count = Convert.ToInt32(floorCount);
                    await SaveBulkFloorData(count, planId, name, project, member, key, token);
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
                    var parkingType = GetModuleDetails("ParkingType", "Name", parkingTypeName, null, 0);
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
                        response.SuccessData.Add($"{name} added!");
                    }
                }
                if (list.Any())
                    await dataService.SaveBulkkDataAsync("Parking", list, token);
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
    private async Task SaveBulkFloorData(int floorCount, long towerId, string towerName, Project project, string member, string key, CancellationToken token)
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
                listplan.Add(plan);
            }
            await dataService.SaveBulkkDataAsync("Plan", listplan, token);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, $"Exception in SaveFloorData method and details: '{ex.Message}'");
            throw;
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
                var company = GetModuleDetails("Company", "Name", belongsTo, null, 0);
                if (company == null)
                {
                    response.FailureData.Add($"{name}: Company is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Project", "Name", name, null, 0) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    return response;
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
                var assetGroup = GetModuleDetails("AssetGroup", "Name", groupName, null, 0);
                if (assetGroup == null)
                {
                    response.FailureData.Add($"{groupName}: Item Group is not found!");
                    continue;
                }

                // Get Asset Type
                var assetType = GetModuleDetails("AssetType", "Name", typeName, null, 0);
                if (assetType == null)
                {
                    response.FailureData.Add($"{typeName}: Item Type is not found!");
                    continue;
                }

                // Get UOM
                var uom = GetModuleDetails("UOM", "Name", uomName, null, 0);
                if (uom == null)
                {
                    response.FailureData.Add($"{uomName}: UOM is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Asset", "Name", name, null, 0) != null)
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
                var project = GetModuleDetails("Project", "Name", projectName, null, 0);
                if (project == null)
                {
                    response.FailureData.Add($"{name}: Project is not found!");
                    continue;
                }

                // Get Tower
                var tower = GetModuleDetails("Plan", "Name", towerName, "tower", 0);
                if (tower == null)
                {
                    response.FailureData.Add($"{name}: Tower is not found!");
                    continue;
                }

                // Get Parking Type
                var parkingType = GetModuleDetails("ParkingType", "Name", parkingtypeName, null, 0);
                if (parkingType == null)
                {
                    response.FailureData.Add($"{name}: Parking Type is not found!");
                    continue;
                }

                // Duplicate Check
                if (GetModuleDetails("Parking", "Name", name, null, 0) != null)
                {
                    response.FailureData.Add($"{name}: Already exists!");
                    return response;
                }

                response.SuccessData.Add($"{name} added!");

                list.Add(new Parking
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Name = name,
                    ProjectId = tower.ProjectId,
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
                var project = GetModuleDetails("Project", "Name", projectName, null, 0);
                if (project == null)
                {
                    response.FailureData.Add($"{projectName}: Project is not found!");
                    continue;
                }

                // Get Tower
                var tower = GetModuleDetails("Plan", "Name", towerName, "tower", 0);
                if (tower == null)
                {
                    response.FailureData.Add($"{towerName}: Tower is not found!");
                    continue;
                }

                // Get Floor
                var floor = GetModuleDetails("Plan", "Name", floorName, "floor", 0);
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
                    var outSideEntityType = GetModuleDetails("OutSideEntityType", "Name", outSideEntityTypeName, null, 0);
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
                if (GetModuleDetails("FlatTemplate", "Name", name, null, 0) != null)
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
                    var RoomType = GetModuleDetails("RoomType", "Name", roomTypeName, null, 0);
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