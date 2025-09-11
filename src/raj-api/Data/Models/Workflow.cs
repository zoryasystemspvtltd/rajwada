using System.ComponentModel.DataAnnotations.Schema;
using ILab.Extensionss.Data.Models;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class Workflow : LabModel
    {
        public string? Code { get; set; }
        public string? Type { get; set; }
        public string? Data { get; set; }

        /// <summary>
        /// Projects belongs to company
        /// </summary>
        [ForeignKey("Project")]
        public virtual long? ProjectId { get; set; }
        [JsonIgnore]
        public virtual Project? Project { get; set; }

        public virtual string? ProjectName { get; set; }
        [ForeignKey("Tower")]
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
        [JsonIgnore]
        public virtual ICollection<Activity>? Activity { get; set; }
    }
}
