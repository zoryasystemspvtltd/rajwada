using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Data.Models;

public class OutSideEntityType : LabModel, IGlobal
{
    public string? Code { get; set; }

    [JsonIgnore]
    public virtual ICollection<OutSideEntity>? OutsideEntity { get; set; }
}