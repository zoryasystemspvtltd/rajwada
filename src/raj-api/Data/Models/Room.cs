using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class Room : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? Description { get; set; }
}