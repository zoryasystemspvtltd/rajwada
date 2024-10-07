using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class AssetGroup : LabModel, IAssets
    {
        public virtual string? Code { get; set; }

        #region
        [JsonIgnore]
        public virtual ICollection<Asset>? Assets { get; set; }
        #endregion
    }
}