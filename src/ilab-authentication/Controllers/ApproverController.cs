using ILab.Extensions;
using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using IlabAuthentication.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IlabAuthentication.Controllers
{
    [ApiController]
    [Route("/api/approver/")]
    public class ApproverController : ControllerBase
    {
        private readonly ILogger<ApproverController> _logger;
        private readonly AuthenticationDbContext _dbContext;
        public ApproverController(ILogger<ApproverController> logger
            , AuthenticationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            
        }

        [HasPrivileges("approver", "list")]
        [HttpGet("")]
        public async Task<ItemList<Approver>> Get()
        {
            var result = new ItemList<Approver>();
            var option = this.GetApiOption();
            var qRecords = _dbContext.Set<Approver>()
                        .AsQueryable();            
                                                
            var totalRecords = qRecords.Count();

            int minRow = (option.CurrentPage - 1) * option.RecordPerPage;
            int maxRow = (option.CurrentPage) * option.RecordPerPage;

            int totalRecordToBeSelected = ((totalRecords - minRow) > option.RecordPerPage)
                ? option.RecordPerPage : (totalRecords - minRow);

            option.SortColumnName = string.IsNullOrEmpty(option.SortColumnName)
                ? "module" : option.SortColumnName;

            if (option.RecordPerPage == 0)
            {
                totalRecordToBeSelected = totalRecords;
            }

            result.TotalRecords = totalRecords;
            result.Items = qRecords
                .OrderBy(option.SortColumnName, option.SortDirection)
                .Skip(minRow)
                .Take(totalRecordToBeSelected)
                .ToList();

            return result;
        }

        [HasPrivileges("approver", "add")]
        [HttpPost("")]
        public async Task<long> Post(Approver approver)
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            var identity = new ModuleIdentity(member, key);                        
            approver.Member = identity.Member;
            approver.Key = identity.Key;
            await _dbContext.Approvers.AddAsync(approver);
            await _dbContext.SaveChangesAsync();
            return approver.Id;
        }

        [HasPrivileges("approver", "view")]
        [HttpGet("{id}")]
        public async Task<Approver> Get(long id)
        {
            var approver = await _dbContext.Approvers.SingleAsync(p => p.Id == id);
                       
            return approver;
        }

        [HasPrivileges("approver", "edit")]
        [HttpPut("{id}")]
        public async Task<long> Put(long id, Approver approver)
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            var identity = new ModuleIdentity(member, key);

            // TODO Assign role
            var extingApprover = await _dbContext.Approvers.SingleAsync(p => p.Id == id);           
            extingApprover.Module = approver.Module;
            extingApprover.Member = identity.Member;
            extingApprover.Key = identity.Key;                       
            
            await _dbContext.SaveChangesAsync();
            return approver.Id;
        }

        [HasPrivileges("approver", "delete")]
        [HttpDelete("{id}")]
        public async Task<long> Delete(long id)
        {
            // TODO Softdelete 
            var existing = await _dbContext.Approvers.SingleAsync(p => p.Id == id);
            _dbContext.Approvers.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return existing.Id;
        }
    }
}
