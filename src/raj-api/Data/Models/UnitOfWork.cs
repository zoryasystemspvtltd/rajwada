using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

public class UnitOfWork : LabModel
{
    public string? MarkerJson { get; set; }

    #region Relations
    /// <summary>
    /// Project is also a collection of other projects
    /// </summary>
    [ForeignKey("Plan")]
    public virtual long? PlanId { get; set; }
    [JsonIgnore]
    public virtual Plan? Plan { get; set; }

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

