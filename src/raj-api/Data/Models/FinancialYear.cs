using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class FinancialYear : LabModel
    {
        public virtual string? Code { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime EndDate { get; set; }
        public virtual string FinYear { get; set; }
    }
}