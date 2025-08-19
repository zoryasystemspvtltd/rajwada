using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Data.Models;

public class FlatType : LabModel, IGlobal
{
    public string? Code { get; set; }
    [JsonIgnore]
    public virtual ICollection<FlatTemplate>? FlatTemplates { get; set; }
}