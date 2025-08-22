using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class Parking : LabModel, IGlobal
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
    [ForeignKey("Plan")]
    public virtual long? TowerId { get; set; }
    [JsonIgnore]
    public virtual Plan? Plan { get; set; }

    /// <summary>
    /// ParkingTypeId belongs to ParkingType
    /// </summary>
    [ForeignKey("ParkingType")]
    public virtual long? ParkingTypeId { get; set; }
    [JsonIgnore]
    public virtual ParkingType? ParkingType { get; set; }
}

public class ParkingRawData
{
    public long ParkingTypeId { get; set; }
    public int? NoOfParking { get; set; }
}