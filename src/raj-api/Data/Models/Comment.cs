using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class Comment : LabModel, IGlobal
{
    public virtual string? Remarks { get; set; }
    /// <summary>
    /// Comment belongs to Activity
    /// </summary>
    [ForeignKey("Activity")]
    public virtual long? ActivityId { get; set; }
    [JsonIgnore]
    public virtual Activity? Activity { get; set; }
}