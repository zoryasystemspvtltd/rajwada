using ILab.Extensions;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using IlabAuthentication;
using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using Microsoft.AspNetCore.Identity;
using RajApi.Data;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Text;

namespace RajHost;

public class Helper
{
    public static string GetSwaggerDoc()
    {
        var templateFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "swagger", "v1", "swagger.template");
        var swaggerFile = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "swagger", "v1", "swagger.json");

        string text = File.ReadAllText(templateFile);

        text = text.Replace("\"DYNAMIC_PROPERTY\": \"DUMMY\"", GenerateDynamicComponent());

        text = text.Replace("\"DYNAMIC_PATH\": \"DUMMY\"", GenerateDynamicPath());


        File.WriteAllText(swaggerFile, text);

        return "/swagger/v1/swagger.json"; ;
    }
    private static string GenerateDynamicPath()
    {
        var asm = typeof(RajDataHandler).Assembly;
        StringBuilder sb = new StringBuilder();

        string template = "\"/api/@@MODULE_NAME@@\"" +
            ":{\"get\"" +
            ":{\"tags\":[\"@@MODULE_NAME@@\"],\"responses\"" +
            ":{\"200\"" +
            ":{\"description\":\"Success\",\"content\"" +
            ":{\"text/plain\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@ItemList\"}},\"application/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@ItemList\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@ItemList\"}}}}}},\"post\"" +
            ":{\"tags\":[\"@@MODULE_NAME@@\"],\"requestBody\"" +
            ":{\"content\"" +
            ":{\"application/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"application/*+json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}}}},\"responses\"" +
            ":{\"200\"" +
            ":{\"description\":\"Success\",\"content\"" +
            ":{\"text/plain\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"application/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}}}}}},\"/api/@@MODULE_NAME@@/{id}\"" +
            ":{\"get\"" +
            ":{\"tags\":[\"@@MODULE_NAME@@\"],\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}],\"responses\"" +
            ":{\"200\"" +
            ":{\"description\":\"Success\",\"content\"" +
            ":{\"text/plain\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"application/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}}}}}},\"put\"" +
            ":{\"tags\":[\"@@MODULE_NAME@@\"],\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}],\"requestBody\"" +
            ":{\"content\"" +
            ":{\"application/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}},\"application/*+json\"" +
            ":{\"schema\"" +
            ":{\"$ref\":\"#/components/schemas/@@MODULE_NAME@@\"}}}},\"responses\"" +
            ":{\"200\"" +
            ":{\"description\":\"Success\",\"content\"" +
            ":{\"text/plain\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"application/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}}}}},\"delete\"" +
            ":{\"tags\":[\"@@MODULE_NAME@@\"],\"parameters\":[{\"name\":\"id\",\"in\":\"path\",\"required\":true,\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}],\"responses\"" +
            ":{\"200\"" +
            ":{\"description\":\"Success\",\"content\"" +
            ":{\"text/plain\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"application/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}},\"text/json\"" +
            ":{\"schema\"" +
            ":{\"type\":\"integer\",\"format\":\"int32\"}}}}}}},";

        foreach (var type in asm.GetTypes().Where(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(LabModel))))
        {
            sb.AppendLine(template.Replace("@@MODULE_NAME@@", type.Name));
        }
        return sb.ToString();
    }
    private static string GenerateDynamicComponent()
    {
        var asm = typeof(RajDataHandler).Assembly;

        StringBuilder sb = new StringBuilder();

        foreach (var type in asm.GetTypes().Where(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(LabModel))))
        {
            sb.AppendLine($"\"{type.Name}\": {{"); // 1
            sb.AppendLine("\"type\": \"object\",");
            sb.AppendLine("\"properties\": {");//2
            foreach (var property in type.GetProperties())
            {
                if (property.Name == "Status")
                {
                    sb.AppendLine("\"status\": {");//3
                    sb.AppendLine("\"$ref\": \"#/components/schemas/StatusType\"");
                    sb.AppendLine("},");//-3
                }
                else
                {
                    sb.AppendLine($"\"{property.Name}\": {{");//3
                    sb.AppendLine($"\"type\": \"{GetPropertyType(property.PropertyType.Name)}\",");
                    if (property.PropertyType.Name == "Int32")
                    {
                        sb.AppendLine("\"format\": \"int32\",");
                    }

                    if (property.PropertyType.Name == "Nullable`1")
                    {
                        var genericArgument = property.PropertyType.GenericTypeArguments.FirstOrDefault(p => p.Name == "DateTime");
                        if (genericArgument != null)
                        {
                            sb.AppendLine("\"format\": \"date-time\",");
                        }

                    }

                    var sttr = property
                      .GetCustomAttributes(false)
                      .ToDictionary(a => a.GetType().Name, a => a)
                      .FirstOrDefault(a => a.Key == "StringLengthAttribute");
                    if (sttr.Key != null)
                    {
                        sb.AppendLine($"\"maxLength\": {((StringLengthAttribute)sttr.Value).MaximumLength},");
                        sb.AppendLine($"\"minLength\": {((StringLengthAttribute)sttr.Value).MinimumLength},");
                    }

                    if (Nullable.GetUnderlyingType(property.PropertyType) != null)
                    {
                        sb.AppendLine("\"nullable\": true");
                    }

                    sb.AppendLine("},");//-3
                }
            }
            sb.AppendLine("},");//-2
            sb.AppendLine("\"additionalProperties\": false");
            sb.AppendLine("},");//-1

            sb.AppendLine($"\"{type.Name}ItemList\": {{");//1
            sb.AppendLine("\"type\": \"object\",");
            sb.AppendLine("\"properties\": {");//2
            sb.AppendLine("\"totalRecord\": {");//3
            sb.AppendLine("\"type\": \"integer\",");
            sb.AppendLine("\"format\": \"int32\"");
            sb.AppendLine("},");//-3
            sb.AppendLine("\"items\": {");//3
            sb.AppendLine("\"type\": \"array\",");
            sb.AppendLine("\"items\": {");//4
            sb.AppendLine($"\"$ref\": \"#/components/schemas/{type.Name}\"");
            sb.AppendLine("},");//-4
            sb.AppendLine("\"nullable\": true");
            sb.AppendLine("}");//-3
            sb.AppendLine("},");//-2
            sb.AppendLine("\"additionalProperties\": false");
            sb.AppendLine("},");//-1

        }


        return sb.ToString();
    }
    private static string GetPropertyType(string name)
    {
        switch (name)
        {
            case "Int32":
                return "integer";
            default:
                return "string";
        }
    }
}

public class PrivilegeMiddleware : IMiddleware
{
    private readonly AuthenticationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    public PrivilegeMiddleware(AuthenticationDbContext dbContext
        , UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _userManager = userManager;
    }
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var user = context.User;
        // Your authentication logic goes here
        if (user.Identity.IsAuthenticated)
        {
            var loggedInUser = await _userManager.GetUserAsync(user);

            var roles = _dbContext
            .UserRoles?
            .Join(_dbContext.Roles,
                u => u.RoleId,
                r => r.Id,
                (u, r) => new { u.UserId, r.Name })
            .Where(u => u.UserId == loggedInUser.Id)
            .Select(p => p.Name)
            .ToList();

            var roleClaims = roles?.Select(p => new Claim(ClaimTypes.Role, p)).ToList();
            context.User.Identities.First().AddClaims(roleClaims);

            var privileges = _dbContext
                 .UserRoles?
                 .Join(_dbContext.Roles,
                     u => u.RoleId,
                     r => r.Id,
                     (u, r) => new { u.UserId, r.Privileges })
                 .Where(u => u.UserId == loggedInUser.Id)
                 .SelectMany(p => p.Privileges)
                 .Select(p => new PrivilegeDetails() { Module = p.Module, Name = p.Name,Type=p.Type })
                 .Distinct()
                 .OrderBy(o => o.Module)
                 .ThenBy(o => o.Name)
                 .ToList();

            var privilegeClaims = privileges?.Select(p => new Claim("privileges", $"{p.Module}_{p.Type}:{p.Name}")).ToList();
            var appIdentity = new ClaimsIdentity(privilegeClaims);
            context.User.Identities.First().AddClaims(privilegeClaims);


        }

        // Call the next middleware in the pipeline
        await next.Invoke(context);
    }
}

public class ModuleIdentityMiddleware : IMiddleware
{
    private readonly AuthenticationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;
    public ModuleIdentityMiddleware(AuthenticationDbContext dbContext
        , UserManager<ApplicationUser> userManager)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        _userManager = userManager;
    }
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        var user = context.User;
        // Your authentication logic goes here
        if (user.Identity.IsAuthenticated)
        {
            var loggedInUser = await _userManager.GetUserAsync(user);
            var identity = new RajApi.Data.ModuleIdentity(loggedInUser.Email, loggedInUser.Key);

            var privilegeClaims= new List<Claim>();
            privilegeClaims.Add(new Claim("activity-member", $"{identity.Member}"));
            privilegeClaims.Add(new Claim("activity-key", $"{identity.Key}"));
            var appIdentity = new ClaimsIdentity(privilegeClaims);
            context.User.Identities.First().AddClaims(privilegeClaims);


        }

        // Call the next middleware in the pipeline
        await next.Invoke(context);
    }
}

public class DatabaseSettings
{
    public string? Server { get; set; }
    public string? Database { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public int? CommandTimeout { get; set; }
}

