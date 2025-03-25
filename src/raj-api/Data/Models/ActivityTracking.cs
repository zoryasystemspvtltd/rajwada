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

    public class TaskItem
    {
        public int ItemId { get; set; }
        public decimal Quantity { get; set; }
        public int UomId { get; set; }
    }
    public class FinalItem
    {
        public long TaskId { get; set; }
        public string ItemName { get; set; }
        public int ItemId { get; set; }
        public decimal Quantity { get; set; }
        public decimal? TotalQuantity { get; set; }
        public decimal? Cost { get; set; }
        public int? ManPower { get; set; }
        public string TransactionDate { get; set; }
    }
}
