using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class LevelSetup : LabModel, IApproval
{
    public string? InChargeName { get; set; }
    public string? InChargeId { get; set; }
    public string? ProjectId { get; set; }
    public string? ProjectName { get; set; }
    public string? VechileNo { get; set; }
    public string? TrackingNo { get; set; }
    public DateTime? DocumentDate { get; set; }
    public string? SupplierId { get; set; }
    public string? SupplierName { get; set; }
    public string? Remarks { get; set; }
    public bool? IsApproved { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public string? ApprovedBy { get; set; }
}