using System.ComponentModel.DataAnnotations.Schema;
using ILab.Extensionss.Data.Models;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class Resource : LabModel
    {
        #region Plan And Assessment
        public virtual string? Type { get; set; }

        public virtual decimal Quantity { get; set; }

        #endregion
        #region Relations
        /// <summary>
        /// Project is also a collection of other projects
        /// </summary>
        [ForeignKey("Room")]
        public virtual long? RoomId { get; set; }
        [JsonIgnore]
        public virtual Room? Room { get; set; }

        /// <summary>
        /// Plan is also a collection of other plans
        /// </summary>
        [ForeignKey("Asset")]
        public virtual long? AssetId { get; set; }

        [JsonIgnore]
        public virtual Asset? Asset { get; set; }

        [ForeignKey("Plan")]
        public virtual long? PlanId { get; set; }

        [JsonIgnore]
        public virtual Plan? Plan { get; set; }

        [ForeignKey("Activity")]
        public virtual long? ActivityId { get; set; }

        [JsonIgnore]
        public virtual Activity? Activity { get; set; }

        #endregion
    }
}
