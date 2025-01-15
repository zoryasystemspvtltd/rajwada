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

    //[HasPrivileges("add","plan")]
    [HttpPost]
    public async Task<dynamic> PostAsync([FromForm] BulkDataUpload model, CancellationToken token)
    {
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
            string uniquefilename = string.Concat(fileName, DateTime.Now.ToString("ddMMyyyymmss"), ".xlsx");
            string filepath = Path.Combine(folderPath, uniquefilename);
            //save uploaded file
            using (var fileStream = new FileStream(filepath, FileMode.Create))
            {
                await model.File.CopyToAsync(fileStream);               
            }
            await ProcessExcelStream(fileName, filepath,token);
        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
            throw;
        }
        return -1L;
        //return response;
    }

    private async Task ProcessExcelStream(string dataModel, string filePath, CancellationToken token)
    {
        DataTable dt = new DataTable();
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
        await SaveToDatabase(dataModel, dt, token);

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
    private async Task SaveToDatabase(string dataModel, DataTable dataTable, CancellationToken token)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            dataService.Identity = new ModuleIdentity(member, key);

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var dataRow = dataTable.Rows[i];
                dynamic data;
                string model = "Plan";
                switch (dataModel.ToUpper())
                {
                    case "TOWERDETAILS":
                        data = CreateTowerDataModel(dataRow, member, key);
                        await dataService.AddAsync(model, data, token);
                        break;
                    case "FLATDETAILS":
                        data = CreateFlatDataModel(dataRow, member, key);
                        await dataService.AddAsync(model, data, token);
                        break;
                    case "FLOORDETAILS":
                        data = CreateFloorDataModel(dataRow, member, key);
                        await dataService.AddAsync(model, data, token);
                        break;
                }
            }

        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
        }
    }
    private dynamic CreateFloorDataModel(DataRow dataRow, string member, string key)
    {
        var tower = GetModuleDetails("Tower", "Name", dataRow[2].ToString(), member, key);
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
        return obj;
    }
    private dynamic CreateFlatDataModel(DataRow dataRow, string member, string key)
    {
        var floor = GetModuleDetails("Floor", "Name", dataRow[2].ToString(), member, key);
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
        return obj;
    }

    private dynamic CreateTowerDataModel(DataRow dataRow, string member, string key)
    {
        var project = GetModuleDetails("Project", "Name", dataRow[2].ToString(), member, key);
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
        return obj;
    }

    private dynamic GetModuleDetails(string model, string name, string? value, string member, string key)
    {
        dataService.Identity = new ModuleIdentity(member, key);
        ListOptions option = new();
        Condition con = new()
        {
            Operator = OperatorType.Likelihood,
            Name = name,
            Value = value
        };
        option.SearchCondition = con;
        var data = dataService.Get(model, option);
     
        if (data != null)
        {
            return data.Items[0];
        }
        else
        {
            logger.LogError("No data retrive from backend for " + model + "  name:" + value);
            return 0;
        }

    }
}


