using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models
{
    public class BulkDataUpload : LabModel
    {
        public required IFormFile File { get; set; }
    }

    public class BulkResponse
    {
        public BulkResponse()
        {
            SuccessData = [];
            FailureData = [];
        }
        public List<string> SuccessData { get; set; }
        public List<string> FailureData { get; set; }
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
