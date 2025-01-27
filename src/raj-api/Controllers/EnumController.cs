using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data.Models;

namespace RajApi.Controllers;

[ApiController]
[Route("/api/enum/")]
[Authorize]
public class EnumController : ControllerBase
{

    public EnumController()
    {
    }

    [HttpGet("{module}")]
    public IActionResult Get(string module)
    {
        return Ok(GetEnum(module));
    }

    private List<EnumData> GetEnum(string module)
    {
        List<EnumData> enumValues = [];
        Type type = null;
        switch (module)
        {
            case "statusType":
                type = typeof(StatusType);
                break;
            case "stateType":
                type = typeof(StateType);
                break;
            case "approvalStatusType":
                type = typeof(ApprovalStatusType);
                break;
            case "priorityStatusType":
                type = typeof(PriorityStatusType);
                break;
            case "qualityType":
                type = typeof(QualityType);
                break;
        }

        foreach (var itemType in Enum.GetValues(type))
        {
            enumValues.Add(new EnumData()
            {
                Name = Enum.GetName(type, itemType),
                Value = (int)itemType
            });
        }
        return enumValues;
    }
}


