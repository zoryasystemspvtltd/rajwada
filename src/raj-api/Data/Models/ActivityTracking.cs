using ILab.Extensionss.Data.Models;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models
{
    public class ActivityTracking : LabModel
    {   
        public virtual int? ManPower { get; set; } 
        public virtual bool? IsOnHold { get; set; }
        public virtual bool? IsCancelled { get; set; }       
        public virtual bool? IsCuringDone { get; set; }
        public virtual decimal? Cost { get; set; }
        public virtual string? Item { get; set; }

        #region Relations
        /// <summary>
        /// Activity is also a collection of other Activity tracking
        /// </summary>
        [ForeignKey("Activity")]
        public virtual long? ActivityId { get; set; }
        [JsonIgnore]
        public virtual Activity? Activity { get; set; }
        #endregion
    }
}
