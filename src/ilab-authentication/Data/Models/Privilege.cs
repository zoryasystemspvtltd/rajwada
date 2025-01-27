using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IlabAuthentication.Data.Models;

public class Privilege
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [StringLength(50)]
    public string? Name { get; set; }

    [StringLength(50)]
    public string? Module { get; set; }

    [StringLength(50)]
    public string? Type { get; set; }

    [ForeignKey("Role")]
    public long? RoleId { get; set; }
    
    [JsonIgnore]
    public virtual ApplicationRole? Role { get; set; }

    public virtual string? Member { get; set; }
    public virtual string? Key { get; set; }
}

public class ModuleIdentity
{
    public ModuleIdentity(string member, string key)
    {
        Member = member;
        Key = key;
    }
    public string Member { get; }
    public string Key { get; }
}