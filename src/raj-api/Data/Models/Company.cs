using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace RajApi.Data.Models
{
    public class Company : LabModel, ICompany
    {
        public string Code { get; set; }
        public string? BelongTo { get; set; }
        public string Type { get; set; }
        public string? Zone { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public int? PinCode { get; set; }
        public int? Latitude { get; set; }
        public int? Longitude { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? ContactName { get; set; }
        public string? Logo { get; set; }
        public string? QrCode { get; set; }
        public string? Currency { get; set; }
        public string? GSTNo { get; set; }
        public string? PanNo { get; set; }
        public string? TinNo { get; set; }

        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }

        [JsonIgnore]
        public virtual Company? Parent { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? ParentName
        {
            get
            {
                return Parent?.Name; 
            }
            private set { /* needed for EF */ }
        }

        [JsonIgnore]
        public virtual ICollection<Project>? Projects { get; set; }
    }
}
