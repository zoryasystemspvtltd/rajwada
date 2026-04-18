namespace RajApi.Data.Models
{
    public class WorkStatusRequest
    {
        public string Type { get; set; } = null!; // inside / outside

        public long? ProjectId { get; set; }
        public long? TowerId { get; set; }
        public long? FloorId { get; set; }

        // Inside only
        public long? FlatId { get; set; }
        public long? RoomId { get; set; }

        // Outside only
        public long? OutsideEntityId { get; set; }

        public string? UserId { get; set; }
    }

    public class ActivityDto
    {
        public string ActivityId { get; set; } = null!;
        public string Name { get; set; } = null!;
        public DateTime? ExpectedStartDate { get; set; }
        public DateTime? ExpectedEndDate { get; set; }
        public string Type { get; set; } = null!;
        public long? FlatId { get; set; } = null!;
        public string WorkId { get; set; } = null!;
        public long? OutSideEntityId { get; set; } = null!;
    }

    public class StatusGroup
    {
        public int Count { get; set; }
        public List<ActivityDto> Activities { get; set; } = new();
    }

    public class WorkStatusResponse
    {
        public StatusGroup NotStarted { get; set; } = new();
        public StatusGroup Hold { get; set; } = new();
        public StatusGroup InProgress { get; set; } = new();
        public StatusGroup Delayed { get; set; } = new();
        public StatusGroup Closed { get; set; } = new();
        public StatusGroup Rework { get; set; } = new();
    }
}
