using ILab.Extensionss.Data.Models;
using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class Project : LabModel, IProject
    {
        public virtual string? Code { get; set; }
        public virtual string? StartFinYear { get; set; }        
        public virtual string? BelongTo { get; set; }
        public virtual string? Zone { get; set; }
        public virtual string? Address1 { get; set; }
        public virtual string? Address2 { get; set; }
        public virtual string? Address3 { get; set; }
        public virtual string? Country { get; set; }
        public virtual string? State { get; set; }
        public virtual string? City { get; set; }
        public virtual int? PinCode { get; set; }
        public virtual int? Latitude { get; set; }
        public virtual int? Longitude { get; set; }
        public virtual string? PhoneNumber { get; set; }
        public virtual string? ContactName { get; set; }
        public string? Blueprint { get; set; }

        #region Workflow
        /// <summary>
        /// Module Status 
        /// </summary>
        public override StatusType? Status { get => base.Status; set => base.Status = value; }

        /// <summary>
        /// Workflow State 
        /// </summary>
        public virtual StateType? WorkflowState { get; set; }

        /// <summary>
        /// Approval Status
        /// </summary>
        public virtual ApprovalStatusType? ApprovalStatus { get; set; }
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
                if (Plans != null)
                {
                    amount = Plans.Sum(p => p.BudgetAllocationAmount);
                }
                return amount + BudgetAmount;
            }
            private set { /* needed for EF */ }
        }

        /// <summary>
        /// Actual cost - bottom up 
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)] 
        public virtual decimal TotalCost {
            get
            {
                var amount = 0.0m;
                if (Plans != null)
                {
                    amount = Plans.Sum(p => p.TotalCost);
                }
                return amount;
            }
            private set { /* needed for EF */ }
        }

        /// <summary>
        /// Plan Start Date
        /// </summary>
        public virtual DateTime? PlanStartDate { get; set; }
        /// <summary>
        /// Plan End Date
        /// </summary>
        public virtual DateTime? PlanEndDate { get; set; }

        /// <summary>
        /// Dadeline Date
        /// </summary>
        public virtual DateTime? CompletionCertificateDate { get; set; }

        #endregion

        #region Relations
        /// <summary>
        /// Project is also a collection of other projects
        /// </summary>
        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }
        [JsonIgnore]
        public virtual Project? Parent { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? ParentName
        {
            get
            {
                return Parent?.Name;
            }
            private set { /* needed for EF */ }
        }

        /// <summary>
        /// Projects belongs to company
        /// </summary>
        [ForeignKey("Company")]
        public virtual long? CompanyId { get; set; }
        [JsonIgnore]
        public virtual Company? Company { get; set; }

        public virtual string? CompanyName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Plan>? Plans { get; set; }

        [JsonIgnore]
        public virtual ICollection<Parking>? Parkings { get; set; }

        [JsonIgnore]
        public virtual ICollection<ProjectDocNoTracking>? ProjectDocNoTrackings { get; set; }
        #endregion
    }
}
