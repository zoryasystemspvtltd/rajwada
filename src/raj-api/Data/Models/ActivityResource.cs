using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class ActivityResource : LabModel
    {
        public string? ResourceType { get; set; }
        public decimal? UnitCost { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? TotalCost { get; set; }
    }
}
