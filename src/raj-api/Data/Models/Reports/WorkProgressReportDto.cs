using ILab.Extensionss.Data.Models;

namespace RajApi.Data.Models.Reports
{
    /// <summary>
    /// Work Progress Report DTO
    /// Exposes comprehensive activity progress data with hierarchical structure
    /// </summary>
    public class WorkReportDto
    {
        public long ActivityId { get; set; }
        public string CompanyName { get; set; } = null!;
        public string ProjectName { get; set; } = null!;
        public string InsideOutside { get; set; } = null!; // "Inside" or "Outside"
        public string TowerName { get; set; } = null!;
        public string? FloorName { get; set; }
        public string? FlatName { get; set; }
        public string? RoomName { get; set; }
        public string ActivityName { get; set; } = null!;
        public string? Developer { get; set; } // CreatedBy member
        public string? Contractor { get; set; } // Contractor name if available
        public string? Engineer { get; set; } // ModifiedBy member
        public DateTime? ReportDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Day { get; set; }
        public decimal? EstimateCost { get; set; }
        public decimal? ActualCost { get; set; }
        public decimal? Variance { get; set; }
        public int? ProgressPercentage { get; set; }
        public bool? IsApproved { get; set; }
        public StatusType Status { get; set; }
    }

    /// <summary>
    /// Work Progress Report Request filter
    /// </summary>
    public class WorkReportRequest
    {
        //public long? CompanyId { get; set; }
        public long? ProjectId { get; set; }
        public long? TowerId { get; set; }
        //public long? FloorId { get; set; }
        //public long? FlatId { get; set; }
        //public long? RoomId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        //public string? InsideOutside { get; set; } // "inside" or "outside"
    }
    public class ReportGroup
    {
        public List<WorkReportDto> Activities { get; set; } = new();
    }

    public class WorkReportData
    {
        public ReportGroup NotStarted { get; set; } = new();
        public ReportGroup Hold { get; set; } = new();
        public ReportGroup Cancelled { get; set; } = new();
        public ReportGroup InProgress { get; set; } = new();
        public ReportGroup Delayed { get; set; } = new();
        public ReportGroup Closed { get; set; } = new();
        public ReportGroup Rework { get; set; } = new();
    }
}

/// <summary>
/// Summary statistics for work progress
/// </summary>
public class WorkProgressReportSummary
{
    public int TotalActivities { get; set; }
    public decimal TotalEstimatedCost { get; set; }
    public decimal TotalActualCost { get; set; }
    public int AverageProgressPercentage { get; set; }
    public int CompletedActivities { get; set; }
    public int InProgressActivities { get; set; }
    public int PendingActivities { get; set; }
    public int ApprovedActivities { get; set; }
    public List<CountByType> ByInsideOutside { get; set; } = new();
    public List<CountByType> ByStatus { get; set; } = new();
}

/// <summary>
/// Count by type for summary statistics
/// </summary>
public class CountByType
{
    public string Type { get; set; } = null!;
    public int Count { get; set; }
}
