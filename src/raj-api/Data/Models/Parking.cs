using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class Parking : LabModel, IGlobal
{
    /// <summary>
    /// TowerId belongs to Plan
    /// </summary>
    [ForeignKey("Plan")]
    public virtual long? TowerId { get; set; }
    [JsonIgnore]
    public virtual Plan? Plan { get; set; }
    public string? Code { get; set; }
    public virtual int? NoOfParking { get; set; }

    /// <summary>
    /// ParkingTypeId belongs to ParkingType
    /// </summary>
    [ForeignKey("ParkingType")]
    public virtual long? ParkingTypeId { get; set; }
    [JsonIgnore]
    public virtual ParkingType? ParkingType { get; set; }
}