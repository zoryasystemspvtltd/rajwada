using System.ComponentModel.DataAnnotations.Schema;
using ILab.Extensionss.Data.Models;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class RoomDetails : LabModel
    {
        public virtual string? RoomId { get; set; }
       
        #region Relations
        /// <summary>
        /// RoomTypeId belongs to RoomType
        /// </summary>
        [ForeignKey("RoomType")]
        public virtual long? RoomTypeId { get; set; }
        [JsonIgnore]
        public virtual RoomType? RoomType { get; set; }

        [ForeignKey("Plan")]
        public virtual long? PlanId { get; set; }

        [JsonIgnore]
        public virtual Plan? Plan { get; set; }

        #endregion
    }
}
