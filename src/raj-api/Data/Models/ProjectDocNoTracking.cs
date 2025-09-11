using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class ProjectDocNoTracking : LabModel
    {
        public virtual string? Code { get; set; }
        /// <summary>
        /// Project is also a collection of other projects
        /// </summary>
        [ForeignKey("Project")]
        public virtual long? ProjectId { get; set; }
        [JsonIgnore]
        public virtual Project? Project { get; set; }
        public virtual int LastDocumentNo { get; set; }
        public virtual DateTime LastDocumentNoGenerated { get; set; }
    }
}