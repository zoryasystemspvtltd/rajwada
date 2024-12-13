using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace RajApi.Data.Models;

public class RsDaag : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? RsDaagNo { get; set; }
    public string? Area { get; set; }
    public string? RsKhatian { get; set; }
    public string? LrNo { get; set; }
    public string? LrKhatian { get; set; }
    public string? RsParcha { get; set; }
    public string? ConcernArea { get; set; }

    /// <summary>
    /// RsDaag belongs to Mouza
    /// </summary>
    [ForeignKey("Mouza")]
    public virtual long? MouzaId { get; set; }
    [JsonIgnore]
    public virtual Mouza? Mouza { get; set; }
    public virtual string? MouzaName { get; set; }
}