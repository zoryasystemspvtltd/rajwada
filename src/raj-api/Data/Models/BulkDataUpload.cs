using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class BulkDataUpload : LabModel
    {
        public string? DataModel { get; set; }
        public string? RawData { get; set; }
    }

    public class Tower
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required string Project { get; set; }
    }

    public class Floor
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required string Tower { get; set; }
    }

    public class Flat
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required string Floor { get; set; }
        public required string Tower { get; set; }
    }
}
