using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class FlatTemplate : LabModel, IGlobal
{
    public string? Code { get; set; }

    /// <summary>
    /// FlatTypeId belongs to FlatType
    /// </summary>
    [ForeignKey("FlatType")]
    public virtual long? FlatTypeId { get; set; }
    [JsonIgnore]
    public virtual FlatType? FlatType { get; set; }
    public virtual int? NoBedRooms { get; set; }
    public virtual int? NoKitchens { get; set; }
    public virtual int? NoBathRooms { get; set; }
    public virtual int? NoLivingRooms { get; set; }
    public virtual int? NoBalcony { get; set; }
    public virtual int? NoOthers { get; set; }
}