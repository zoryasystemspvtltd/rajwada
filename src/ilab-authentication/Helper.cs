using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using IlabAuthentication.Controllers;
using IlabAuthentication.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace IlabAuthentication;

public class HasPrivilegesAttribute : TypeFilterAttribute
{
    public HasPrivilegesAttribute(string module, string name) : base(typeof(HasPrivilegesFilter))
    {
        Arguments = new object[] { new PrivilegeDetails() { Name = name, Module = module } };
    }
}

public class HasPrivilegesFilter : IAuthorizationFilter
{
    readonly PrivilegeDetails _privilege;

    public HasPrivilegesFilter(PrivilegeDetails privilege)
    {
        _privilege = privilege;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        if (context.HttpContext.User.IsInRole("root"))
        {
            return;
        }

        var privileges = context.HttpContext.User
         .Claims
         .Where(c => c.Type == "privileges")
         .Select(p => new PrivilegeDetails()
         {
             Module = p.Value?.Substring(0, p.Value.IndexOf('_')),
             Type = p.Value?.Substring(p.Value.IndexOf('_') + 1, p.Value.IndexOf(':') - p.Value.IndexOf('_') - 1),
             Name = p.Value?.Substring(p.Value.IndexOf(':') + 1, p.Value.Length - p.Value.IndexOf(':') - 1)
         })
         .ToList();

        var hasClaim = privileges.Exists(p => p.Module == _privilege.Module && p.Name == _privilege.Name);
        if (!context.HttpContext.User.IsInRole("root") && !hasClaim)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}

public class UserDetails
{
    public string? Email { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool Disable { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Department { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public ICollection<string?>? Roles { get; set; }

    public ICollection<PrivilegeDetails>? Privileges { get; set; }
    public string? Theme { get; set; }
}

public class PrivilegeDetails
{
    public string? Module { get; set; }
    public string? Name { get; set; }
    public string? Type { get; set; }
}

public class SmtpSettings
{
    public string? Host { get; set; }
    public int Port { get; set; }
    public bool EnableSsl { get; set; }
    public bool UseDefaultCredentials { get; set; }
    
}

public class EmailSettings
{
    public string? FromEmail { get; set; }
    public string? Password { get; set; }
    
}