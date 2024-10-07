using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class ApplicationLog : LabModel
{
    public long EntityId { get; set; }

    public StatusType ActivityType { get; set; }

    public string? ContentHistory { get; set; }
}
