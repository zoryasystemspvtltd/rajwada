using DocumentFormat.OpenXml.Spreadsheet;
using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class ActivityResource : LabModel
    {
        public virtual string? ResourceType { get; set; }
        public virtual decimal? UnitCost { get; set; }
        public virtual decimal? Quantity { get; set; }
        public virtual decimal? TotalCost { get; set; }

        [ForeignKey("Uoms")]
        public virtual long? UOMId { get; set; }
        [JsonIgnore]
        public virtual Uom? Uoms { get; set; }
        public DateOnly? NotificationStartDate { get; set; }
        public string? AvailabilityStatus { get; set; }
        [StringLength(255)]
        public string? AssignedUser { get; set; }
        public string? Remarks { get; set; }
    }
}
