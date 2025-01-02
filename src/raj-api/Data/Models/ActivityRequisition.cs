using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

public class ActivityRequisition : LabModel
{
    public string? Code { get; set; }
    public string? Description { get; set; }
    public long? Quantity { get; set; }

    #region Workflow
    /// <summary>
    /// Module Status 
    /// </summary>
    public override StatusType? Status { get => base.Status; set => base.Status = value; }

    /// <summary>
    /// Workflow State 
    /// </summary>
    public virtual StateType? State { get; set; }

    public virtual string? Type { get; set; }
    #endregion

    #region Relations
    /// <summary>
    /// Project is also a collection of other projects
    /// </summary>
    [ForeignKey("Activity")]
    public virtual long? ActivityId { get; set; }
    [JsonIgnore]
    public virtual Activity? Activity { get; set; }

    /// <summary>
    /// Plan is also a collection of other plans
    /// </summary>
    [ForeignKey("Parent")]
    public virtual long? ParentId { get; set; }

    [JsonIgnore]
    public virtual UnitOfWork? Parent { get; set; }

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
    public virtual ICollection<Plan>? Plans { get; set; }

    #endregion
}

