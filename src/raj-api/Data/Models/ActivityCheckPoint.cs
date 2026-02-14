using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class ActivityCheckPoint : LabModel
    {
        public virtual string? Code { get; set; }
        public virtual string? Blueprint { get; set; }
       
        #region
        [ForeignKey("Activity")]
        public virtual long ActivityId { get; set; }
        [JsonIgnore]
        public virtual Activity? Activity { get; set; }

        [ForeignKey("WorkCheckPoint")]
        public virtual long WorkCheckPointId { get; set; }
        [JsonIgnore]
        public virtual WorkCheckPoint? WorkCheckPoint { get; set; }

        #endregion
    }
}