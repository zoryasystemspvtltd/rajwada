using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class Workflow : LabModel, IWorkflow
    {

        public string? Code { get; set; }
        public string? Description { get; set; }

        #region Workflow
        /// <summary>
        /// Module Status 
        /// </summary>
        public override StatusType? Status { get => base.Status; set => base.Status = value; }

        /// <summary>
        /// Workflow State 
        /// </summary>
        public virtual StateType? State { get; set; }

        /// <summary>
        /// Approval Status
        /// </summary>
        public virtual ApprovalStatusType? ApprovalStatus { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? Type
        {
            get
            {
                return Name;
            }
            private set { }
        }
        #endregion

        #region Plan and Assessment
        /// <summary>
        /// Plan budget amount during project creation
        /// </summary>
        public virtual decimal BudgetAmount { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual decimal BudgetAllocationAmount
        {
            get
            {
                var amount = 0.0m;
                if (Workflows != null)
                {
                    amount = Workflows.Sum(p => p.BudgetAllocationAmount);
                }
                return amount + BudgetAmount;
            }
            private set { /* needed for EF */ }
        }

        public virtual decimal Cost { get; set; }
        /// <summary>
        /// Actual cost - bottom up 
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual decimal TotalCost
        {
            get
            {
                var amount = 0.0m;
                if (Workflows != null)
                {
                    amount = Workflows.Sum(p => p.TotalCost);
                }
                return amount + Cost;
            }
            private set { /* needed for EF */ }
        }

        /// <summary>
        /// Workflow Start Date
        /// </summary>
        public virtual DateTime? WorkflowStartDate { get; set; }
        /// <summary>
        /// Workflow End Date
        /// </summary>
        public virtual DateTime? WorkflowEndDate { get; set; }

        /// <summary>
        /// Dadeline Date
        /// </summary>
        public virtual DateTime? CompletionCertificateDate { get; set; }

        /// <summary>
        /// Plan Start Date
        /// </summary>
        public virtual DateTime? StartDate { get; set; }
        /// <summary>
        /// Plan End Date
        /// </summary>
        public virtual DateTime? EndDate { get; set; }

        [NotMapped]
        public bool Selected { get { return true; } }

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
        /// Plan is also a collection of other Plans
        /// </summary>
        [ForeignKey("Plan")]
        public virtual long? PlanId { get; set; }
        [JsonIgnore]
        public virtual Plan? Plan { get; set; }

        /// <summary>
        /// Workflow is also a collection of other Workflow
        /// </summary>
        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }

        [JsonIgnore]
        public virtual Workflow? Parent { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? ParentName
        {
            get
            {
                return Parent?.Name;
            }
            private set { /* needed for EF */ }
        }

        [JsonIgnore]
        public virtual ICollection<Workflow>? Workflows { get; set; }

        #endregion
    }
}
