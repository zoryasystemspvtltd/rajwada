using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

public class Plan : LabModel, IAssignable
{
    public string? Code { get; set; }
    public string? Description { get; set; }
    public string? Blueprint { get; set; }
    public string? MarkerJson { get; set; }

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

    public virtual string? Type { get; set; }
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
            if (Plans != null)
            {
                amount = Plans.Sum(p => p.TotalCost);
            }
            return amount + Cost;
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
    /// Plan is also a collection of other plans
    /// </summary>
    [ForeignKey("Parent")]
    public virtual long? ParentId { get; set; }

    [JsonIgnore]
    public virtual Plan? Parent { get; set; }

    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public virtual string? ParentName
    {
        get
        {
            return Parent?.Name;
        }
        private set { /* needed for EF */ }
    }

    [ForeignKey("FlatTemplate")]
    public virtual long? FlatTemplateId { get; set; }
    [JsonIgnore]
    public virtual FlatTemplate? FlatTemplate { get; set; }

    [JsonIgnore]
    public virtual ICollection<Plan>? Plans { get; set; }

    [NotMapped]
    public string? Parkings { get; set; }

    [NotMapped]
    public long? NoOfFloors { get; set; }

    [NotMapped]
    public string? FlatTemplates { get; set; }

    public virtual long? FlatTemplateDetailsId { get; set; }
    #endregion
}

