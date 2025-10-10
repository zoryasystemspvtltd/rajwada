using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class FlatTemplateDetails : LabModel, IGlobal
{
    /// <summary>
    /// FlatTemplateId belongs to FlatTemplate
    /// </summary>
    [ForeignKey("FlatTemplate")]
    public virtual long FlatTemplateId { get; set; }
    [JsonIgnore]
    public virtual FlatTemplate? FlatTemplate { get; set; }
    
    /// <summary>
    /// RoomId belongs to Room
    /// </summary>
    [ForeignKey("Room")]    
    public virtual long? RoomId { get; set; }
    public virtual Room? Room { get; set; }

    public virtual int? RoomCount { get; set; }

    [JsonIgnore]
    public virtual ICollection<Plan>? Plans { get; set; }
    [JsonIgnore]
    public virtual ICollection<Workflow>? Workflows { get; set; }
}
public class FlatTemplateRawData
{
    public long flatTemplateId { get; set; }
    public int noOfFlats { get; set; }
}