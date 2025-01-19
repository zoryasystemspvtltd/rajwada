using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ILab.Data;
using RajApi.Data;
using ILab.Extensionss.Data;
using RajApi.Data.Models;
using ILab.Extensionss.Common;
using System.Data;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

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
            string module = HttpContext.Request.QueryString.Value.Split('=')[1].ToString();
            //bool flag = CheckedTemplateAccordingtoModule(fileName, module);
            //if (flag)
            //{
            string uniquefilename = string.Concat(fileName, DateTime.Now.ToString("ddMMyyyymmss"), ".xlsx");
            string filepath = Path.Combine(folderPath, uniquefilename);
            //save uploaded file
            using (var fileStream = new FileStream(filepath, FileMode.Create))
            {
                await model.File.CopyToAsync(fileStream);
            }
            response = await ProcessExcelData(fileName, filepath, response, token);
            //}
            //else
            //    response.FailureData.Add("Uploaded a wrong template file!");

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
            using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(filePath, true))
            {
                WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                Sheet sheet = workbookPart.Workbook.Sheets.GetFirstChild<Sheet>();
                WorksheetPart worksheetPart = (WorksheetPart)workbookPart.GetPartById(sheet.Id);

                Worksheet workSheet = worksheetPart.Worksheet;
                SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                IEnumerable<Row> rows = sheetData.Descendants<Row>();

                foreach (Cell cell in rows.ElementAt(0))
                {
                    dt.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                }

                foreach (Row row in rows) //this will also include your header row...
                {
                    DataRow tempRow = dt.NewRow();
                    for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                    {
                        tempRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                    }
                    dt.Rows.Add(tempRow);
                }
            }
            dt.Rows.RemoveAt(0); //...so i'm taking it out here.

            // Save DataTable to database
            if (dt.Rows.Count > 0)
                response = await SaveToDatabase(dataModel, dt, response, token);
            else
                response.FailureData?.Add("No data in excelsheet");
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
            dataService.Identity = new ModuleIdentity(member, key);

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var dataRow = dataTable.Rows[i];
                dynamic? data = null;
                switch (dataModel.ToUpper())
                {
                    case "TOWERDETAILS":
                        (data, response) = CreateTowerDataModel(dataRow, member, key, response);
                        break;
                    case "FLATDETAILS":
                        (data, response) = CreateFlatDataModel(dataRow, member, key, response);
                        break;
                    case "FLOORDETAILS":
                        (data, response) = CreateFloorDataModel(dataRow, member, key, response);
                        break;
                }

                if (data != null)
                    await dataService.SaveDataAsync("Plan", data, token);
            }
        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
            response.FailureData?.Add(ex.Message);
        }
        return response;
    }
    private (dynamic?, BulkResponse) CreateFloorDataModel(DataRow dataRow, string member, string key, BulkResponse response)
    {
        //Get Tower details
        var tower = GetModuleDetails("Plan", "Name", dataRow[2].ToString(), "tower", member, key);
        if (tower != null)
        {
            //Duplicate checking
            var floor = GetModuleDetails("Plan", "Name", dataRow[0].ToString(), "floor", member, key);
            if (floor == null)
            {
                response.SuccessData.Add(dataRow[0].ToString());
                Plan obj = new()
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Type = "floor",
                    Name = dataRow[0].ToString(),
                    Description = dataRow[1].ToString(),
                    ProjectId = tower.ProjectId,
                    ParentId = tower.Id
                };
                return (obj, response);
            }
            else
            {
                response.FailureData.Add(dataRow[0].ToString() + ": Already Exist");
                return (null, response);
            }
        }
        else
        {
            response.FailureData.Add(dataRow[0].ToString());
            return (null, response);
        }

    }
    private (dynamic?, BulkResponse) CreateFlatDataModel(DataRow dataRow, string member, string key, BulkResponse response)
    {
        //Get Floor details
        var floor = GetModuleDetails("Plan", "Name", dataRow[2].ToString(), "floor", member, key);
        if (floor != null)
        {
            //Duplicate checking
            var flat = GetModuleDetails("Plan", "Name", dataRow[0].ToString(), "flat", member, key);
            if (floor == null)
            {
                response.SuccessData.Add(dataRow[0].ToString());
                Plan obj = new()
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Type = "floor",
                    Name = dataRow[0].ToString(),
                    Description = dataRow[1].ToString(),
                    ProjectId = floor.ProjectId,
                    ParentId = floor.Id
                };
                return (obj, response);
            }
            else
            {
                response.FailureData.Add(dataRow[0].ToString() + ": Already Exist");
                return (null, response);
            }
        }
        else
        {
            response.FailureData.Add(dataRow[0].ToString());
            return (null, response);
        }
    }

    private (dynamic?, BulkResponse) CreateTowerDataModel(DataRow dataRow, string member, string key, BulkResponse response)
    {
        //Get Project details
        var project = GetModuleDetails("Project", "Name", dataRow[2].ToString(), null, member, key);
        if (project != null)
        {
            //Duplicate checking
            var tower = GetModuleDetails("Plan", "Name", dataRow[0].ToString(), "tower", member, key);
            if (tower == null)
            {
                response.SuccessData.Add(dataRow[0].ToString());
                Plan obj = new()
                {
                    Date = DateTime.Now,
                    Member = member,
                    Key = key,
                    Type = "tower",
                    Name = dataRow[0].ToString(),
                    Description = dataRow[1].ToString(),
                    ProjectId = project.Id,
                };
                return (obj, response);
            }
            else
            {
                response.FailureData.Add(dataRow[0].ToString() + ": Already Exist");
                return (null, response);
            }
        }
        else
        {
            response.FailureData.Add(dataRow[0].ToString());
            return (null, response);
        }
    }

    private dynamic? GetModuleDetails(string model, string name, string? value, string? type, string member, string key)
    {
        dataService.Identity = new ModuleIdentity(member, key);
        ListOptions option = new();
        Condition con = new()
        {
            //Operator baln mean Equality
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
        }

        option.SearchCondition = con;
        var data = dataService.Get(model, option);

        if (data.Items.Count > 0)
        {
            return data.Items[0];
        }
        else
        {
            logger.LogError("No data retrive from backend for " + model + "  name:" + value);
            return null;
        }
    }

    public static string GetCellValue(SpreadsheetDocument document, Cell cell)
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
        bool flag = false;
        if (fileName.Equals("TOWERDETAILS", StringComparison.CurrentCultureIgnoreCase) && module.Equals("TOWER", StringComparison.CurrentCultureIgnoreCase))
        {
            flag = true;
        }
        else
            flag = false;
        if (fileName.Equals("FLOORDETAILS", StringComparison.CurrentCultureIgnoreCase) && module.Equals("FLOOR", StringComparison.CurrentCultureIgnoreCase))
        {
            flag = true;
        }
        else
            flag = false;
        if (fileName.Equals("FLATDETAILS", StringComparison.CurrentCultureIgnoreCase) && module.Equals("FLAT", StringComparison.CurrentCultureIgnoreCase))
        {
            flag = true;
        }
        else
            flag = false;

        return flag;
    }
}


