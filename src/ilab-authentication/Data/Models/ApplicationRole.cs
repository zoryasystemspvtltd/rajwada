using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace IlabAuthentication.Data.Models
{
    public class ApplicationRole: IdentityRole<long>
    {
        public virtual ICollection<Privilege>? Privileges { get; set; }
        public override string? Name { get => base.Name; set => base.Name = value; }
        [JsonIgnore]
        public override string? NormalizedName { get => base.NormalizedName; set => base.NormalizedName = value; }
        [JsonIgnore]
        public override string? ConcurrencyStamp { get => base.ConcurrencyStamp; set => base.ConcurrencyStamp = value; }
        public virtual string? Member { get; set; }
        public virtual string? Key { get; set; }
    }
}
