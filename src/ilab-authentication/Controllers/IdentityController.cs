using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net;


namespace IlabAuthentication.Controllers;

[Authorize]
[ApiController]
[Route("/api/identity/")]
public class IdentityController : ControllerBase
{
    private readonly ILogger<IdentityController> _logger;
    private readonly AuthenticationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    public IdentityController(ILogger<IdentityController> logger
        , AuthenticationDbContext dbContext
        , UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _userManager = userManager;
    }

    /// <summary>
    /// All User has privileges to get his own privileges
    /// </summary>
    /// <returns></returns>
    [HttpGet("GetUserPrivileges")]
    public async Task<UserDetails> GetUserPrivileges()
    {
        var userDetails = new UserDetails();
        var loggedInUser = await _userManager.GetUserAsync(User);
        if (loggedInUser == null)
        {
            return userDetails;
        }
        userDetails.Email = loggedInUser.Email;
        userDetails.FirstName = loggedInUser.FirstName;
        userDetails.LastName = loggedInUser.LastName;
        userDetails.PhoneNumber = loggedInUser.PhoneNumber;
        userDetails.Address = loggedInUser.Address;
        userDetails.Department = loggedInUser.Department;
        userDetails.Disable = loggedInUser.Disable;
        userDetails.PhotoUrl = loggedInUser.PhotoUrl;

        userDetails.Roles = _dbContext
            .UserRoles?
            .Join(_dbContext.Roles,
                u => u.RoleId,
                r => r.Id,
                (u, r) => new { u.UserId, r.Name })
            .Where(u => u.UserId == loggedInUser.Id)
            .Select(p => p.Name)
            .ToList();

        userDetails.Privileges = User
            .Claims
            .Where(c => c.Type == "privileges")
            .Select(p => new PrivilegeDetails()
            {
                Module = p.Value?.Substring(0, p.Value.IndexOf(':')),
                Name = p.Value?.Substring(p.Value.IndexOf(':') + 1, p.Value.Length - p.Value.IndexOf(':') - 1)
            })
            .ToList();



        return userDetails;
    }

    [HttpPost("ChangePassword")]
    public async Task<IActionResult> ChangePassword(ChangePasswordModule changePassword)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var loggedInUser = await _userManager.GetUserAsync(User);
        // TODO Validate If old password id correct


        string token = await _userManager.GeneratePasswordResetTokenAsync(loggedInUser);
        await _userManager.ResetPasswordAsync(loggedInUser, token, changePassword.NewPassword);

        return Ok();
    }

    [HttpPost("ResetUserPassword")]
    public async Task<IActionResult> ResetUserPassword(ResetPasswordModule resetPassword)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = _dbContext.Users.First(u=> u.Email == resetPassword.Email);
 
        string token = await _userManager.GeneratePasswordResetTokenAsync(user);
        await _userManager.ResetPasswordAsync(user, token, "Admin@123");

        return Ok();
    }

    [HttpPost("UpdateProfile")]
    public async Task<IActionResult> UpdateProfile(ApplicationUser user)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var loggedInUser = await _userManager.GetUserAsync(User);
        if (loggedInUser != null)
        {
            var existingUser = await _dbContext.Users.SingleAsync(p => p.Id == loggedInUser.Id);
            //_dbContext.Attach(user);
            existingUser.FirstName = user.FirstName;
            existingUser.LastName = user.LastName;
            //existingUser.Email = user.Email; // Email can't be changed
            existingUser.PhoneNumber = user.PhoneNumber;
            existingUser.Department = user.Department;
            existingUser.PhotoUrl = user.PhotoUrl;
            existingUser.Address = user.Address;

            await _dbContext.SaveChangesAsync();
        }

        return Ok();
    }
}

public class ResetPasswordModule
{
    [Required]
    public string? Email { get; set; }
}

public class ChangePasswordModule : ResetPasswordModule
{
    [Required]
    public string? CurrentPassword { get; set; }
    [Required]
    public string? NewPassword { get; set; }
}

public class ItemList<T>
        where T : class
{
    public long TotalRecords { get; set; }

    public IEnumerable<T> Items { get; set; }
}