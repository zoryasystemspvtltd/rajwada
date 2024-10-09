using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class ActivityDependency : LabModel
    {
       
        [ForeignKey("FromActivity")]
        public virtual long? FromActivityId { get; set; }
        [JsonIgnore]
        public virtual Activity? FromActivity { get; set; }
        
        [ForeignKey("ToActivity")]
        public virtual long? ToActivityId { get; set; }
        [JsonIgnore]
        public virtual Activity? ToActivity { get; set; }
        public string? DependencyType { get; set; }
        public decimal LagTime { get; set; }
    }
}
