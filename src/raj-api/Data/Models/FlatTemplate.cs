using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Data.Models;

public class FlatTemplate : LabModel, IGlobal
{
    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<FlatTemplateDetails>? FlatTemplateDetails { get; set; }
}