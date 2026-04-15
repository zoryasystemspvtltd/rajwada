using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class WorkCheckPointTracking : LabModel, IGlobal
{
    [ForeignKey("WorkCheckPoints")]
    public virtual long? WorkCheckPointId { get; set; }
    [JsonIgnore]
    public virtual WorkCheckPoint? WorkCheckPoints { get; set; }

    [ForeignKey("Activity")]
    public virtual long? ActivityId { get; set; }
    [JsonIgnore]
    public virtual Activity? Activity { get; set; }

    public virtual string? Photo { get; set; }

    [ForeignKey("ActivityTracking")]
    public virtual long? ActivityTrackingId { get; set; }
    [JsonIgnore]
    public virtual ActivityTracking? ActivityTracking { get; set; }
}
