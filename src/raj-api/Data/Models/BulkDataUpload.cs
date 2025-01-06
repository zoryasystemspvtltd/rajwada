using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class BulkDataUpload : LabModel
    {
        public string? DataModel { get; set; }
        public string? RawData { get; set; }
    }
}
