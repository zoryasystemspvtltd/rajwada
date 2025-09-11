using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class Dependency : LabModel
    {
        public string? Code { get; set; }
        public string? Type { get; set; }
        public string? Description { get; set; }
        
        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }

        [JsonIgnore]
        public virtual Dependency? Parent { get; set; }
       
        [ForeignKey("Belongs")]
        public virtual long? BelongsTo { get; set; }
        [JsonIgnore]
        public virtual Dependency? Belongs { get; set; }

        [JsonIgnore]
        public virtual ICollection<Activity>? Activity { get; set; }
    }
}
