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
    /// <summary>
    /// RoomId belongs to Room
    /// </summary>
    [ForeignKey("Room")]    
    public virtual long? RoomId { get; set; }
    public virtual Room? Room { get; set; }
    public virtual int? RoomCount { get; set; }
}