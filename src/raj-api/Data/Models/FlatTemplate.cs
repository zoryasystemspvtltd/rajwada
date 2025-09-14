using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class FlatTemplate : LabModel, IGlobal
{
    public string? Description { get; set; }
    [JsonIgnore]
    public virtual ICollection<FlatTemplateDetails>? FlatTemplateDetails { get; set; }

    [NotMapped]
    public string? TemplateDetails { get; set; }
}

public class FlatData
{
    public List<FlatTemplateRawData>? flatTemplates { get; set; }
}