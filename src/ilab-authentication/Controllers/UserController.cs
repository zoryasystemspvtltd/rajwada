using ILab.Extensions;
using ILab.Extensionss.Common;
using ILab.Extensionss.Data;
using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using IlabAuthentication.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security;
using System.Security.Principal;

namespace IlabAuthentication.Controllers
{
    [ApiController]
    [Route("/api/user/")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly AuthenticationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserController(ILogger<UserController> logger
            , AuthenticationDbContext dbContext
            , UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _userManager = userManager;

        }

        [HasPrivileges("user", "list")]
        [HttpGet("")]
        public async Task<ItemList<ApplicationUser>> Get()
        {
            var result = new ItemList<ApplicationUser>();
            var option = this.GetApiOption();
            var qRecords = _dbContext.Set<ApplicationUser>()
                        .AsQueryable();
            var loggedInUser = await _userManager.GetUserAsync(User);

            var noSelf = new Condition()
            {
                Name = "email",
                Value = loggedInUser?.Email,
                Operator = OperatorType.InEquality,
            };

            if (!User.IsInRole("root"))
            {
                var noRoot = new Condition()
                {
                    Name = "NormalizedUserName",
                    Value = "ROOT",
                    Operator = OperatorType.InEquality,
                    And = new Condition()
                    {
                        Name = "NormalizedUserName",
                        Value = "SUPER@RAJWADA.COM",
                        Operator = OperatorType.InEquality,
                        And = noSelf
                    }
                };

                if (option.SearchCondition != null)
                {
                    noRoot.And = option.SearchCondition;
                }
                qRecords = qRecords.Where(noRoot);
            }

            var totalRecords = qRecords.Count();

            int minRow = (option.CurrentPage - 1) * option.RecordPerPage;
            int maxRow = (option.CurrentPage) * option.RecordPerPage;

            int totalRecordToBeSelected = ((totalRecords - minRow) > option.RecordPerPage)
                ? option.RecordPerPage : (totalRecords - minRow);

            option.SortColumnName = string.IsNullOrEmpty(option.SortColumnName)
                ? "email" : option.SortColumnName;

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

        [HasPrivileges("user", "add")]
        [HttpPost("")]
        public async Task<long> Post(ApplicationUser user)
        {
            try
            {
                var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
                var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
                var identity = new ModuleIdentity(member, key);

                // todo more on password
                user.EmailConfirmed = true;
                // Password Admin@123 // TODO Change Password
                user.PasswordHash = "AQAAAAEAACcQAAAAEEefFhqm+R9OLtBjdjt2lunRuIhcbwULdR4zjkvZb0KaitPni5P+bqo51WAjPH7FCA==";
                user.SecurityStamp = "LOSTZG7CZF7DPZ4L5EGLXEOVQ2SJCV42";
                user.ConcurrencyStamp = "5b0ff902-597e-4c93-8390-33823bc58d2e";
                user.UserName = user.Email;
                user.NormalizedUserName = user?.UserName?.ToUnderscoreCase();
                user.NormalizedEmail = user?.Email?.ToUnderscoreCase();
                user.Member = identity.Member;
                user.Key = identity.Key;
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                if (user.Roles != null)
                    foreach (var role in user.Roles)
                    {
                        _dbContext.UserRoles.Add(new IdentityUserRole<long>()
                        {
                            RoleId = role.Id,
                            UserId = user.Id,
                        });
                    }
                await _dbContext.SaveChangesAsync();
                return user.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Exception in Post, message:'{ex.Message}'");
                throw;
            }
        }

        [HasPrivileges("user", "view")]
        [HttpGet("{id}")]
        public async Task<ApplicationUser> Get(long id)
        {
            var user = await _dbContext.Users.SingleAsync(p => p.Id == id);
            user.Roles = await _dbContext.Roles.Join(_dbContext.UserRoles
                                                , r => r.Id
                                                , ur => ur.RoleId
                                                , (r, ur) => new { ur.RoleId, ur.UserId, r.Name })
                                        .Where(r => r.UserId == id)
                                        .Select(r => new UserRoles()
                                        {
                                            Id = r.RoleId,
                                            Name = r.Name
                                        })
                                        .ToListAsync();

            user.Privileges = await _dbContext.Privileges
                                        .Join(_dbContext.Roles
                                                , p => p.RoleId
                                                , r => r.Id
                                                , (p, r) => p)
                                        .Join(_dbContext.UserRoles
                                                , r => r.RoleId
                                                , ur => ur.RoleId
                                                , (p, ur) => new { p.Id, p.Name, p.Module, ur.UserId })
                                        .Where(r => r.UserId == id)
                                        .OrderBy(r => r.Module)
                                        .ThenBy(r => r.Name)
                                        .Select(p => new Privilege()
                                        {
                                            Id = p.Id,
                                            Module = p.Module,
                                            Name = p.Name,
                                        })
                                        .ToListAsync();
            return user;
        }

        [HasPrivileges("user", "edit")]
        [HttpPut("{id}")]
        public async Task<long> Put(long id, ApplicationUser user)
        {
            try
            {
                var member = User.Claims.First(p => p.Type.Equals("activity-member")).Value;
                var key = User.Claims.First(p => p.Type.Equals("activity-key")).Value;
                var identity = new ModuleIdentity(member, key);

                // TODO Assign role
                var existingUser = await _dbContext.Users.SingleAsync(p => p.Id == id);
                //_dbContext.Attach(user);
                existingUser.FirstName = user.FirstName;
                existingUser.LastName = user.LastName;
                //existingUser.Email = user.Email; // Email can't be changed
                existingUser.PhoneNumber = user.PhoneNumber;
                existingUser.Department = user.Department;
                existingUser.EmailConfirmed = !user.Disable;
                existingUser.Disable = user.Disable;
                existingUser.PhotoUrl = user.PhotoUrl;
                existingUser.Address = user.Address;
                existingUser.Member = identity.Member;
                //existingUser.UserName = user.Email;// Eser name can't be changed

                var _existingRoles = await _dbContext.UserRoles.Where(p => p.UserId == existingUser.Id).ToListAsync();
                if (_existingRoles != null && _existingRoles.Count > 0)
                {
                    _dbContext.UserRoles.RemoveRange(_existingRoles);
                }
                if (user.Roles != null)
                    foreach (var role in user.Roles)
                    {
                        _dbContext.UserRoles.Add(new IdentityUserRole<long>()
                        {
                            RoleId = role.Id,
                            UserId = existingUser.Id,
                        });
                    }
                await _dbContext.SaveChangesAsync();
                return user.Id;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Exception in Put, message:'{ex.Message}'");

                throw;
            }
        }

        [HasPrivileges("user", "delete")]
        [HttpDelete("{id}")]
        public async Task<long> Delete(long id)
        {
            // TODO Softdelete 
            var existing = await _dbContext.Users.SingleAsync(p => p.Id == id);
            _dbContext.Users.Remove(existing);
            await _dbContext.SaveChangesAsync();
            return existing.Id;
        }
    }
}
