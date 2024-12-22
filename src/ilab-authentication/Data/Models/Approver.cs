using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IlabAuthentication.Data.Models
{
    public class Approver
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [StringLength(50)]
        public string? Module { get; set; }
        public virtual long? Level { get; set; }
        [ForeignKey("ApplicationUser")]
        public virtual long? UserId { get; set; }
        public virtual string? UserName { get; set; }
        [JsonIgnore]
        public virtual ApplicationUser? ApplicationUser { get; set; }
        public virtual string? Member { get; set; }
        public virtual string? Key { get; set; }
        public virtual string? Notes { get; set; }
    }
}
