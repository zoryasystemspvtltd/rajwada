using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IlabAuthentication.Data.Models
{
    public class ApplicationUser : IdentityUser<long>
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool Disable { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Department { get; set; }
        [NotMapped]
        public string Name { get { return $"{FirstName} {LastName}"; } }
        public string? Address { get; set; }
        public string? Theme { get; set; }
        [NotMapped]
        public List<UserRoles>? Roles { get; set; }
        [NotMapped]
        public List<Privilege>? Privileges { get; set; }

        [JsonIgnore]
        public override string? PasswordHash { get => base.PasswordHash; set => base.PasswordHash = value; }
        [JsonIgnore]
        public override string? UserName { get => base.UserName; set => base.UserName = value; }
        [JsonIgnore]
        public override string? NormalizedEmail { get => base.NormalizedEmail; set => base.NormalizedEmail = value; }
        [JsonIgnore]
        public override string? SecurityStamp { get => base.SecurityStamp; set => base.SecurityStamp = value; }
        [JsonIgnore]
        public override bool EmailConfirmed { get => base.EmailConfirmed; set => base.EmailConfirmed = value; }
        [JsonIgnore]
        public override string? ConcurrencyStamp { get => base.ConcurrencyStamp; set => base.ConcurrencyStamp = value; }
        [JsonIgnore]
        public override bool PhoneNumberConfirmed { get => base.PhoneNumberConfirmed; set => base.PhoneNumberConfirmed = value; }
        [JsonIgnore]
        public override bool TwoFactorEnabled { get => base.TwoFactorEnabled; set => base.TwoFactorEnabled = value; }
        [JsonIgnore]
        public override bool LockoutEnabled { get => base.LockoutEnabled; set => base.LockoutEnabled = value; }
        [JsonIgnore]
        public override DateTimeOffset? LockoutEnd { get => base.LockoutEnd; set => base.LockoutEnd = value; }
        [JsonIgnore]
        public override int AccessFailedCount { get => base.AccessFailedCount; set => base.AccessFailedCount = value; }
        public override string? PhoneNumber { get => base.PhoneNumber; set => base.PhoneNumber = value; }
        public override string? Email { get => base.Email; set => base.Email = value; }
        [JsonIgnore]
        public override string? NormalizedUserName { get => base.NormalizedUserName; set => base.NormalizedUserName = value; }
        public override long Id { get => base.Id; set => base.Id = value; }

        [ForeignKey("Parent")]
        public virtual long? ParentId { get; set; }

        [JsonIgnore]
        public virtual ApplicationUser? Parent { get; set; }
        public virtual string? Member { get; set; }
        public virtual string? Key { get; set; }

    }

    public class UserRoles
    {
        public long Id { get; set; }
        public string? Name { get; set; }
    }
}
