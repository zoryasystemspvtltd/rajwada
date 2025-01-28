using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

public class LevelSetupDetails : LabModel
{
    public string? ItemId { get; set; }
    public string? Quantity { get; set; }
    public string? Price { get; set; }
    public string? UOMId { get; set; }
    public string? UOMName { get; set; }
    public string? QualityStatus { get; set; }
    public string? QualityRemarks { get; set; }
    public string? ReceiverStatus { get; set; }
    public string? ReceiverRemarks { get; set; }

    [ForeignKey("LevelSetupHeader")]
    public virtual long? HeaderId { get; set; }
    [JsonIgnore]
    public virtual LevelSetup? LevelSetupHeader { get; set; }
}