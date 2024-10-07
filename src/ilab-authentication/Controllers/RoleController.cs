using ILab.Extensions;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using IlabAuthentication.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IlabAuthentication.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/role/")]
    public class RoleController : ControllerBase
    {
        private readonly ILogger<RoleController> _logger;
        private readonly AuthenticationDbContext _dbContext;

        public RoleController(ILogger<RoleController> logger, AuthenticationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        [HasPrivileges("role", "list")]
        [HttpGet("")]
        public ItemList<ApplicationRole> Get()
        {
            var result = new ItemList<ApplicationRole>();
            var option = this.GetApiOption();
            var qRecords = _dbContext.Set<ApplicationRole>()
                        .AsQueryable();

            if (!User.IsInRole("root"))
            {
                var noRoot = new Condition()
                {
                    Name = "NormalizedName",
                    Value = "ROOT",
                    Operator = OperatorType.InEquality,
                    And = new Condition()
                    {
                        Name = "NormalizedName",
                        Value = "SUPER",
                        Operator = OperatorType.InEquality,
                    }
                };

                if (option.SearchCondition != null)
                {
                    noRoot.And = option.SearchCondition;
                }
                qRecords = qRecords
                       .Where(noRoot);
            }

            var totalRecords = qRecords.Count();

            int minRow = (option.CurrentPage - 1) * option.RecordPerPage;
            int maxRow = (option.CurrentPage) * option.RecordPerPage;

            int totalRecordToBeSelected = ((totalRecords - minRow) > option.RecordPerPage)
                ? option.RecordPerPage : (totalRecords - minRow);

            option.SortColumnName = string.IsNullOrEmpty(option.SortColumnName)
                ? "name" : option.SortColumnName;

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

            foreach (var item in result.Items)
            {
                item.Privileges = _dbContext
                    .Privileges
                    .Where(p => p.RoleId == item.Id)
                    .ToList();
            }
            return result;
        }

        [HasPrivileges("role", "add")]
        [HttpPost("")]
        public async Task<long> Post(ApplicationRole role)
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            var identity = new ModuleIdentity(member, key);

            role.Member = identity.Member;
            role.Key = identity.Key;
            var newPrivileges = role.Privileges.ToList();
            newPrivileges.ForEach(p =>
            {
                p.Member = identity.Member;
                p.Key = identity.Key;
            });
            role.Privileges = newPrivileges;
            await _dbContext.Roles.AddAsync(role);
            await _dbContext.SaveChangesAsync();
            return role.Id;
        }

        /// <summary>
        /// Role with privileges
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HasPrivileges("role", "view")]
        [HttpGet("{id}")]
        public async Task<ApplicationRole> Get(long id)
        {
            return await _dbContext.Roles
                .Include(r => r.Privileges)
                .SingleAsync(p => p.Id == id);
        }

        [HasPrivileges("role", "edit")]
        [HttpPut("{id}")]
        public async Task<long> Put(long id, ApplicationRole role)
        {
            var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
            var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
            var identity = new ModuleIdentity(member, key);
            role.Member = identity.Member;
            var _existingPrivileges = await _dbContext.Privileges.Where(p => p.RoleId == role.Id).ToListAsync();
            if (_existingPrivileges != null && _existingPrivileges.Count > 0)
            {
                _dbContext.Privileges.RemoveRange(_existingPrivileges);
            }
            var newPrivileges = role.Privileges.ToList();
            newPrivileges.ForEach(p =>
            {
                p.Member = identity.Member;
                p.Key = identity.Key;
            });
            role.Privileges = newPrivileges;
            _dbContext.Attach(role);
            await _dbContext.SaveChangesAsync();
            return role.Id;
        }

        [HasPrivileges("eole", "delete")]
        [HttpDelete("{id}")]
        public async Task<long> Delete(long id)
        {
            var existing = await _dbContext.Roles.SingleAsync(p => p.Id == id);
            _dbContext.Roles.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return existing.Id;
        }
    }
}
