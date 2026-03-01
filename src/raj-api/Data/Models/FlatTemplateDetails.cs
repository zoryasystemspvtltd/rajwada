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
    /// RoomTypeId belongs to RoomType
    /// </summary>
    [ForeignKey("RoomType")]    
    public virtual long? RoomTypeId { get; set; }
    public virtual RoomType? RoomType { get; set; }

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