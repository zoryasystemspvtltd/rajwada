using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class WorkCheckpoints : LabModel, IGlobal
{
    public string? Description { get; set; }
    public string? Type { get; set; }
    public bool? IsPhoto { get; set; }
    public bool? IsCalendar { get; set; }
}
