﻿namespace RajApi.Data.Models;
//public class EnumRequest
//{
//    public List<EnumValue>? StateType { get; set; }
//    public List<EnumValue>? ApprovalStatusType { get; set; }
//    public List<EnumValue>? PriorityStatusType { get; set; }

//}

public class EnumData
{
    public string Name { get; set; }
    public int Value { get; set; }
}

public class IdNamePair
{
    public string Name { get; set; }
    public long Id { get; set; }
}

public enum StateType
{
    Initiated = 0,
    InProgress = 1,
    // TODO More
    Completed = 99
}

public enum ApprovalStatusType
{
    Pending = 0,
    Approved = 1,
    Rejected = -1
}

public enum PriorityStatusType
{
    Low = 0,
    Medium = 1,
    High = 2
}
public enum QualityStatus
{
    Rejected = 0,
    Hold = 1,
    Approved = 2
}

public enum WOUStatus
{
    Initiated = 0,
    InProgress = 1,
    // TODO More
    Completed = 99
}


