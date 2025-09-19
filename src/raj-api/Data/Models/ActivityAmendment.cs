using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class ActivityAmendment : LabModel, IActivityAmendment
    {
        [StringLength(50)]
        public string? Code { get; set; }        
        public virtual bool RejectedByQC { get; set; }
        public virtual string? QCRemarks { get; set; }
        public virtual string? AmendmentReason { get; set; }
        public virtual string? OldData { get; set; }
        public virtual string? NewValues { get; set; }
        public virtual int AmendmentStatus { get; set; }
        [StringLength(255)]
        public virtual string? ReviewedBy { get; set; }

        [ForeignKey("Activity")]
        public virtual long? ActivityId { get; set; }
        [JsonIgnore]
        public virtual Activity? Activity { get; set; }

        /// <summary>
        /// ActivityAmendment is also a collection of other ActivityAmendment
        /// </summary>
        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }
        [JsonIgnore]
        public virtual ActivityAmendment? Parent { get; set; }
    }
}
