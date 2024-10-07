using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;
using Microsoft.IdentityModel.Tokens;

namespace RajApi;

public class HasPrivilegesAttribute : TypeFilterAttribute
{
    public HasPrivilegesAttribute(string name)
        : base(typeof(HasPrivilegesFilter))
    {
        Arguments = new object[] { new PrivilegeDetails() { Name = name, Module = "" } };
    }

    public HasPrivilegesAttribute(string module, string name)
        : base(typeof(HasPrivilegesFilter))
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

        string[] publicModules = ["department"];
        // White listing
        var module = context.HttpContext.Request.RouteValues.GetValueOrDefault("module");
        if (!publicModules.Contains(module))
        {
            if (module == null)
            {
                context.Result = new ForbidResult();
            }
            var privileges = context.HttpContext.User
             .Claims
             .Where(c => c.Type == "privileges")
             .Select(p => new PrivilegeDetails()
             {
                 Module = p.Value?.Substring(0, p.Value.IndexOf(':')),
                 Name = p.Value?.Substring(p.Value.IndexOf(':') + 1, p.Value.Length - p.Value.IndexOf(':') - 1)
             })
             .ToList();

            var hasClaim = privileges.Exists(p => p.Module.Equals($"{module}", StringComparison.OrdinalIgnoreCase)
            && p.Name.Equals(_privilege.Name, StringComparison.OrdinalIgnoreCase));
            if (!context.HttpContext.User.IsInRole("root") && !hasClaim)
            {
                context.Result = new ForbidResult();
            }
        }

    }
}

public class UserDetails
{
    public string? Email { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public ICollection<string?>? Roles { get; set; }

    public ICollection<PrivilegeDetails>? Privileges { get; set; }

}

public class PrivilegeDetails
{
    public string? Module { get; set; }
    public string? Name { get; set; }
}