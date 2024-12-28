using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class Activity : LabModel, IActivity
    {
        public string? Description { get; set; }
        public required string Type { get; set; }

        public string? PhotoUrl { get; set; }

        public string? DocumentLinks { get; set; }

        public string? Notes { get; set; }

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
        /// Actual Start Date
        /// </summary>
        public virtual DateTime? ActualStartDate { get; set; }
        /// <summary>
        /// Actual End Date
        /// </summary>
        public virtual DateTime? ActualEndDate { get; set; }
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
        public string? Items { get; set; }
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
        public virtual long? UserId { get; set; }
        #endregion
    }
}
