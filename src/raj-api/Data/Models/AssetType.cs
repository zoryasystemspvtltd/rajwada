using ILab.Extensionss.Data.Models;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models;

public class AssetType : LabModel, IAssets
{
    public string? Code { get; set; }

    #region
    [JsonIgnore]
    public virtual ICollection<Asset>? Assets { get; set; }
    #endregion
}