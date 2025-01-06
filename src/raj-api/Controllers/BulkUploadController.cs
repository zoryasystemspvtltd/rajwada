using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ILab.Data;
using RajApi.Data;
using System.Data;
using Newtonsoft.Json;
using ILab.Extensionss.Data.Models;
using ILab.Extensionss.Data;
using OfficeOpenXml;
using RajApi.Data.Models;
using ILab.Extensionss.Common;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/")]
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


    [HasPrivileges("add")]
    [HttpPost("{module}")]
    public async Task<long> PostAsync(string module, dynamic data, CancellationToken token)
    {
        long response = 0;
        var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
        var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
        dataService.Identity = new ModuleIdentity(member, key);
        await dataService.AddAsync(module, data, token);
        response = await ProcessData(module, data, token);
        return response;
    }

    private async Task<long> ProcessData(string model, dynamic data, CancellationToken token)
    {
        Type type = GetType(model);
        if (type == null)
        {
            return -1L;
        }

        dynamic val = data.ToString();
        object obj = JsonConvert.DeserializeObject(val, type);
        object[] parameters = new object[2] { obj, token };
        await ProcessExcelStream((string)parameters[0], (byte[])parameters[1], token);
        return -1L;
    }
    public virtual Type? GetType(string model)
    {
        string model2 = model;
        Type type = typeof(ILabDataService).Assembly.GetTypes().FirstOrDefault((Type p) => p.Name.Equals(model2, StringComparison.OrdinalIgnoreCase) && p.IsSubclassOf(typeof(LabModel)));
        if (type == null)
        {
            return null;
        }

        return type;
    }
    private async Task ProcessExcelStream(string dataModel, byte[] bytes, CancellationToken token)
    {
        MemoryStream excelStream = new MemoryStream(bytes);
        // Load the Excel file from the memory stream
        using (var package = new ExcelPackage(excelStream))
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
            await SaveToDatabase(dataModel, dataTable, token);
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
                switch (dataModel.ToUpper())
                {
                    case "TOWER":
                        data = CreateTowerDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, token);
                        break;
                    case "FLOOR":
                        data = CreateFloorDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, token);
                        break;
                    case "FLAT":
                        data = CreateFlatDataModel(dataRow, member, key);
                        await dataService.AddAsync("plan", data, token);
                        break;
                }
            }

        }
        catch (Exception ex)
        {
            logger.LogError("Error to save data:" + ex.Message);
        }
    }
    private dynamic CreateTowerDataModel(DataRow dataRow, string member, string key)
    {
        var project = GetModuleDetails("Project", "Name", dataRow["Project"].ToString());
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
        return (dynamic)obj;
    }

    private dynamic GetModuleDetails(string model, string name, string? value)
    {
        var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
        var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
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

    private dynamic CreateFloorDataModel(DataRow dataRow, string member, string key)
    {
        var tower = GetModuleDetails("Tower", "Name", dataRow["Tower"].ToString());
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
        return (dynamic)obj;
    }
    private dynamic CreateFlatDataModel(DataRow dataRow, string member, string key)
    {
        var floor = GetModuleDetails("Floor", "Name", dataRow["Floor"].ToString());
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
        return (dynamic)obj;
    }
}


