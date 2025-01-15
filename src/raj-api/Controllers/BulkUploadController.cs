using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ILab.Data;
using RajApi.Data;
using ILab.Extensionss.Data;
using RajApi.Data.Models;
using ILab.Extensionss.Common;
using System.Data;
using OfficeOpenXml;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/bulkdataupload/")]
[Authorize]
public class BulkUploadController : ControllerBase
{
    private readonly ILogger<BulkUploadController> logger;
    private readonly RajDataService dataService;
    public BulkUploadController(ILogger<BulkUploadController> logger, RajDataService dataService)
    {
        this.logger = logger;
        this.dataService = dataService;
    }

    [HttpPost]
    public async Task<dynamic> PostAsync([FromForm] BulkDataUpload model)
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
        string uniquefilename = string.Concat(model.File.FileName, DateTime.Now.ToString("ddMMyyyymmss"));
        string filepath = Path.Combine(folderPath, uniquefilename);
        //save uploaded file
        using (var fileStream = new FileStream(filepath, FileMode.Create))
        {
            await model.File.CopyToAsync(fileStream);
            await ProcessExcelStream(model.DataModel, fileStream);
        }


        return -1L;
        //return response;
    }

    private async Task ProcessExcelStream(string dataModel, FileStream fileStream)
    {
        //MemoryStream excelStream = new MemoryStream(bytes);
        // Load the Excel file from the memory stream
        using (var package = new ExcelPackage(fileStream))
        {
            var worksheet = package.Workbook.Worksheets[0]; // Assuming data is in the first worksheet
            var rowCount = worksheet.Dimension.Rows;
            var colCount = worksheet.Dimension.Columns;

            // Create a DataTable to hold the data
            var dataTable = new DataTable();

            // Add columns to DataTable
            for (int col = 1; col <= colCount; col++)
            {
                dataTable.Columns.Add(worksheet.Cells[1, col].Text);
            }

            // Add rows to DataTable
            for (int row = 2; row <= rowCount; row++)
            {
                var dataRow = dataTable.NewRow();
                for (int col = 1; col <= colCount; col++)
                {
                    dataRow[col - 1] = worksheet.Cells[row, col].Text;
                }
                dataTable.Rows.Add(dataRow);
            }

            // Save DataTable to database
            await SaveToDatabase(dataModel, dataTable);
        }
    }

    private async Task SaveToDatabase(string dataModel, DataTable dataTable)
    {
        try
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;

            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                var dataRow = dataTable.Rows[i];
                dynamic data;
                switch (dataModel.ToUpper())
                {
                    case "TOWER":
                        data = CreateTowerDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, null);
                        break;
                    case "FLAT":
                        data = CreateFlatDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, null);
                        break;
                    case "FLOOR":
                        data = CreateFloorDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, null);
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
        var tower = GetModuleDetails("Tower", "Name", dataRow["Tower"].ToString(), member, key);
        Plan obj = new()
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "floor",
            Name = dataRow["Name"].ToString(),
            Description = dataRow["Description"].ToString(),
            ProjectId = tower.ProjectId,
            ParentId = tower.Id
        };
        return obj;
    }
    private dynamic CreateFlatDataModel(DataRow dataRow, string member, string key)
    {
        var floor = GetModuleDetails("Floor", "Name", dataRow["Floor"].ToString(), member, key);
        Plan obj = new()
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "floor",
            Name = dataRow["Name"].ToString(),
            Description = dataRow["Description"].ToString(),
            ProjectId = floor.ProjectId,
            ParentId = floor.Id
        };
        return obj;
    }

    private dynamic CreateTowerDataModel(DataRow dataRow, string member, string key)
    {
        var project = GetModuleDetails("Project", "Name", dataRow["Project"].ToString(), member, key);
        Plan obj = new()
        {
            Date = DateTime.Now,
            Member = member,
            Key = key,
            Type = "tower",
            Name = dataRow["Name"].ToString(),
            Description = dataRow["Description"].ToString(),
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
            Operator = OperatorType.InEquality,
            Name = name,
            Value = value
        };
        option.SearchCondition = con;

        var data = dataService.Get(model, option);
        if (data != null)
        {
            return data[0];
        }
        else
        {
            logger.LogError("No data retrive from backend for " + model + "  name:" + value);
            return 0;
        }

    }
}


