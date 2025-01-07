using ILab.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data.Models;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/module/")]
[Authorize]
public class ModuleController : ControllerBase
{

    public ModuleController()
    {
    }

    [HttpGet()]
    public List<RajModule> Get()
    {
        var asm = typeof(RajDataService).Assembly;
        var type1 = asm.GetTypes()
            .Where(p => p.IsSubclassOf(typeof(LabModel)))
            //.Select(p => new RajModule() { Name = p.Name, IsAssignable = p.BaseType == typeof(IAssignable) })
            .ToList();
        var type = asm.GetTypes()
            .Where(p => p.IsSubclassOf(typeof(LabModel)))
            .Select(p => new RajModule() {
                Name = p.Name, 
                IsAssignable = p.GetInterfaces().Count(a => a == typeof(IAssignable)) > 0 ,
                IsProject = p.GetInterfaces().Count(a => a == typeof(IProject)) > 0,
                IsCompany = p.GetInterfaces().Count(a => a == typeof(ICompany)) > 0,
                IsApproval = p.GetInterfaces().Count(a => a == typeof(IApproval)) > 0,
            })
            .ToList();

        return type;
    }
}

public class RajModule
{
    public string? Name { get; set; }
    public bool? IsAssignable { get; set; }
    public bool? IsProject { get; set; }
    public bool? IsCompany { get; set; }
    public bool? IsApproval { get; set; }
}
