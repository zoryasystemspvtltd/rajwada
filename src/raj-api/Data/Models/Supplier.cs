using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class Supplier : LabModel, IGlobal
{
    public string? Code { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? PanNo { get; set; }
    public string? GSTNo { get; set; }
    public string? LicenceNo { get; set; }
    public DateTime? EffectiveStartDate { get; set; }
    public DateTime? EffectiveEndDate { get; set; }
    public string? SPOC { get; set; }
}