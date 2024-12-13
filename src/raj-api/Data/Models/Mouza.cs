using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class Mouza : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? Gl_No { get; set; }
}