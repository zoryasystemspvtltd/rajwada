using ILab.Extensionss.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

[Keyless]
public class LevelSetupDetails
{
    public string? ItemId { get; set; }
    public string? ItemName { get; set; }
    public string? Quatity { get; set; }
    public string? Price { get; set; }
    public string? UOMId { get; set; }
    public string? UOMName { get; set; }   
    public string? QualityType { get; set; }   
    public string? QualityRemarks { get; set; }

    /// <summary>
    /// Projects belongs to company
    /// </summary>
    [ForeignKey("LevelSetupMaster")]
    public virtual long? LevelSetupMasterId { get; set; }
    [JsonIgnore]
    public virtual LevelSetupMaster? LevelSetupMaster { get; set; }
}