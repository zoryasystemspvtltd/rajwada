using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class Activity : LabModel, IActivity, IApproval
    {
        public virtual string? Description { get; set; }
        public required string Type { get; set; }
        public virtual bool? IsSubSubType { get; set; }
        public virtual string? PhotoUrl { get; set; }
        public virtual string? DocumentLinks { get; set; }
        public virtual string? Notes { get; set; }
        public virtual long? UserId { get; set; }
        public virtual DateTime? CuringDate { get; set; }
        public virtual bool? IsCuringDone { get; set; }
        public virtual bool? IsCancelled { get; set; }
        /// <summary>
        /// Is used for QC
        /// </summary>
        public virtual bool? IsCompleted { get; set; }
        public virtual bool? IsOnHold { get; set; }
        public virtual bool? IsAbandoned { get; set; }
        #region QC
        /// <summary>
        /// Is QC Approved
        /// </summary>
        public virtual bool? IsQCApproved { get; set; }
        /// <summary>
        /// QC Approved Date
        /// </summary>
        public virtual DateTime? QCApprovedDate { get; set; }
        /// <summary>
        /// QC Approved By
        /// </summary>
        public virtual string? QCApprovedBy { get; set; }
        /// <summary>
        /// QC Remarks
        /// </summary>
        public virtual string? QCRemarks { get; set; }
        #endregion

        #region HOD
        /// <summary>
        /// Is HOD Approved
        /// </summary>
        public virtual bool? IsApproved { get; set; }
        /// <summary>
        /// HOD Approved Date
        /// </summary>
        public virtual DateTime? ApprovedDate { get; set; }
        /// <summary>
        /// HOD Approved By
        /// </summary>
        public virtual string? ApprovedBy { get; set; }
        /// <summary>
        /// HOD Remarks
        /// </summary>
        public virtual string? HODRemarks { get; set; }
        #endregion
                
        public string? ActualItems { get; set; }

        #region Workflow
        /// <summary>
        /// Activity Status 
        /// </summary>
        public virtual PriorityStatusType? PriorityStatus { get; set; }

        /// <summary>
        /// Workflow State 
        /// </summary>
        public virtual string? WorkflowState { get; set; }

        /// <summary>
        /// Approval Status
        /// </summary>
        public virtual ApprovalStatusType? ApprovalStatus { get; set; }
        #endregion

        #region Cost and Assessment
        /// <summary>
        /// Activity Cost Estimate
        /// </summary>
        public virtual decimal CostEstimate { get; set; }
        /// <summary>
        /// Activity Actual Cost
        /// </summary>
        public virtual decimal ActualCost { get; set; }
        /// <summary>
        /// Start Date
        /// </summary>
        public virtual DateTime? StartDate { get; set; }
        /// <summary>
        /// End Date
        /// </summary>
        public virtual DateTime? EndDate { get; set; }

        /// <summary>
        /// Estimated time duration
        /// </summary>
        public virtual int Duration { get; set; }
        /// <summary>
        /// Percentage completion
        /// </summary>
        public virtual int ProgressPercentage { get; set; }
        /// <summary>
        /// Items for Activity
        /// </summary>
        public virtual string? Items { get; set; }
        /// <summary>
        /// Actual Start Date
        /// </summary>        
        public virtual DateTime? ActualStartDate { get; set; }

        /// <summary>
        /// Actual End Date
        /// </summary>       
        public virtual DateTime? ActualEndDate { get; set; }

        #endregion

        #region Relations
        /// <summary>
        /// Project is also a collection of other projects
        /// </summary>
        [ForeignKey("Project")]
        public virtual long? ProjectId { get; set; }
        [JsonIgnore]
        public virtual Project? Project { get; set; }

        /// <summary>
        /// Activity is also a collection of other activity
        /// </summary>
        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }
        [JsonIgnore]
        public virtual Activity? Parent { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? ParentName
        {
            get
            {
                return Parent?.Name;
            }
            private set { /* needed for EF */ }
        }
        public virtual long? DependencyId { get; set; }

        [JsonIgnore]
        public virtual Workflow? Dependency { get; set; }
        public virtual long? TowerId { get; set; }

        [JsonIgnore]
        public virtual Plan? Tower { get; set; }
        [ForeignKey("Floor")]
        public virtual long? FloorId { get; set; }

        [JsonIgnore]
        public virtual Plan? Floor { get; set; }
        [ForeignKey("Flat")]
        public virtual long? FlatId { get; set; }

        [JsonIgnore]
        public virtual Plan? Flat { get; set; }

        [ForeignKey("Contractor")]
        public virtual long? ContractorId { get; set; }

        [JsonIgnore]
        public virtual Contractor? Contractor { get; set; }
        #endregion
    }

    public class WorkerReportRequestPayload
    {        
        public long ProjectId { get; set; }
        public long TowerId { get; set; }
        public long FloorId { get; set; }
        public long FlatId { get; set; }
       // public bool IsDownload { get; set; }
    }
    public class WorkerStatusReport
    {
        public long? Id { get; set; }
        public string? ActivityName { get; set; }
        public string? ActivityStatus { get; set; } 
    }
}
