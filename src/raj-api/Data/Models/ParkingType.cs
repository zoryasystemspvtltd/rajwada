using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;

namespace RajApi.Data.Models;

public class ParkingType : LabModel, IGlobal
{
    public string? Code { get; set; }

    [JsonIgnore]
    public virtual ICollection<Parking>? Parkings { get; set; }
}