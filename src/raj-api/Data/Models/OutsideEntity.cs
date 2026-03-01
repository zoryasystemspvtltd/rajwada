using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class OutSideEntity : LabModel, IGlobal
{
    public string? Code { get; set; }
    /// <summary>
    /// Project is also a collection of other projects
    /// </summary>
    [ForeignKey("Project")]
    public virtual long? ProjectId { get; set; }
    [JsonIgnore]
    public virtual Project? Project { get; set; }
    /// <summary>
    /// TowerId belongs to Plan
    /// </summary>
    [ForeignKey("Tower")]
    public virtual long? TowerId { get; set; }
    [JsonIgnore]
    public virtual Plan? Tower { get; set; }

    /// <summary>
    /// TowerId belongs to Plan
    /// </summary>
    [ForeignKey("Floor")]
    public virtual long? FloorId { get; set; }
    [JsonIgnore]
    public virtual Plan? Floor { get; set; }

    /// <summary>
    /// OutSideEntityTypeId belongs to OutSideEntityType
    /// </summary>
    [ForeignKey("OutSideEntityType")]
    public virtual long? OutSideEntityTypeId { get; set; }
    [JsonIgnore]
    public virtual OutSideEntityType? OutSideEntityType { get; set; }

    [NotMapped]
    public string? EntitiesList { get; set; }
}

public class EntitiesList
{
    public long outSideEntityTypeId { get; set; }
    public virtual int noOfEntity { get; set; }
}