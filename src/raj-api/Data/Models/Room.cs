using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Data.Models;

public class Room : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<FlatTemplateDetails>? FlatTemplates { get; set; }
}