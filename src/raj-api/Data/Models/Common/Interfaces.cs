namespace RajApi.Data.Models
{
    public interface IGlobal
    {
    }
    public interface IAssignable
    {
        long? ProjectId { get; set; }
        long? ParentId { get; set; }
        Plan? Parent { get; set; }
    }
    public interface IAssets
    {
    }
    public interface IProject
    {
        long? CompanyId { get; set; }
        long? ParentId { get; set; }
        Project? Parent { get; set; }
    }
    public interface ICompany
    {
    }
    public interface IActivity
    {
        long? ProjectId { get; set; }
        long? ParentId { get; set; }
        Activity? Parent { get; set; }
    }

}
