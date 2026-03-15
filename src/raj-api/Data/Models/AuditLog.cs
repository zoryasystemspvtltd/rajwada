using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations;

namespace RajApi.Data.Models
{
    public class AuditLog : LabModel
    {
        public long EntityId { get; set; }
        [StringLength(50)]
        public string ActionType { get; set; }
        public string? OldValues { get; set; }
        public string? NewValues { get; set; }
        public string? ChangeSummary { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? ReviewedBy { get; set; }
        public DateTime? ReviewedDate { get; set; }
        public string? Remarks { get; set; }
    }
}
