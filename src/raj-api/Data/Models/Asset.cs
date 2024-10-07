using ILab.Extensionss.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RajApi.Data.Models
{
    public class Asset : LabModel, IAssets
    {
        public virtual string? Code { get; set; }

        #region
        [ForeignKey("Uom")]
        public virtual long? UomId { get; set; }
        [JsonIgnore]
        public virtual Uom? Uom { get; set; }
        
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? UomName
        {
            get
            {
                return Uom?.Name;
            }
            private set { /* needed for EF */ }
        }

        [ForeignKey("Type")]
        public virtual long TypeId { get; set; }
        [JsonIgnore]
        public virtual AssetType? Type { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? TypeName
        {
            get
            {
                return Type?.Name;
            }
            private set { /* needed for EF */ }
        }

        [ForeignKey("Group")]
        public virtual long? GroupId { get; set; }
        [JsonIgnore]
        public virtual AssetGroup? Group { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public virtual string? GroupName
        {
            get
            {
                return Group?.Name; ;
            }
            private set { /* needed for EF */ }
        }

        #endregion
    }
}