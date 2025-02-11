using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class Attachment : LabModel
    {
        public string? Module { get; set; }
        public string? File { get; set; }
        public string? ParentId { get; set; }
    }
}
