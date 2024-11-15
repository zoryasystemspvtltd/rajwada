using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class NameMaster : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? LLName { get; set; }
    public string? FatherName { get; set; }
    public bool? IsFatherAlive { get; set; }
    public string? FatherCertificate { get; set; }
    public string? MotherName { get; set; }
    public bool? IsMotherAlive { get; set; }
    public string? MotherCertificate { get; set; }
    public string? GrandFatherName { get; set; }
    public bool? IsGrandFatherAlive { get; set; }
    public string? GrandFatherCertificate { get; set; }
    public string? GrandMotherName { get; set; }
    public bool? IsGrandMotherAlive { get; set; }
    public string? GrandMotherCertificate { get; set; }
    public string? LrNo { get; set; }

    /// <summary>
    /// Name belongs to Mouza
    /// </summary>
    [ForeignKey("Mouza")]
    public virtual long? MouzaId { get; set; }
    [JsonIgnore]
    public virtual Mouza? Mouza { get; set; }
    public virtual string? MouzaName { get; set; }

    /// <summary>
    /// Name belongs to RsDaag
    /// </summary>
    [ForeignKey("RsDaag")]
    public virtual long? RsDaagId { get; set; }
    [JsonIgnore]
    public virtual RsDaag? RsDaag { get; set; }
    public virtual string? RsDaagNo { get; set; }
}