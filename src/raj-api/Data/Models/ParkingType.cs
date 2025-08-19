using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models;

public class ParkingType : LabModel, IGlobal
{
    public string? Code { get; set; }
}