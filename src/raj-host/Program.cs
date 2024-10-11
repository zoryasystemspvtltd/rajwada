using ILab.Data;
using ILab.Extensionss.Data;
using ILab.io;
using IlabAuthentication;
using IlabAuthentication.Data;
using IlabAuthentication.Data.Models;
using IlabAuthentication.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using RajApi.Data;
using RajHost;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using React.AspNet;
using System.Net.Mail;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using JavaScriptEngineSwitcher.Core;

IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(opt =>
//{
//    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "ILab Plan Management", Version = "v1" });
//    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        In = ParameterLocation.Header,
//        Description = "Please enter token",
//        Name = "Authorization",
//        Type = SecuritySchemeType.Http,
//        BearerFormat = "JWT",
//        Scheme = "bearer"
//    });

//    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type=ReferenceType.SecurityScheme,
//                    Id="Bearer"
//                }
//            },
//            new string[]{}
//        }
//    });
//});
builder.Services.AddMemoryCache();
builder.Services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
                .AddChakraCore();

builder.Services.AddReact();
var databaseSettings = configuration.GetSection("DatabaseSettings").Get<DatabaseSettings>();

// My SQL - Need to remove all migration and recreate it
//var connectionString = $"server={databaseSettings.Server};database={databaseSettings.Database};user={databaseSettings.Username};password={databaseSettings.Password}";
//builder.Services.AddDbContext<AuthenticationDbContext>(options => options.UseMySQL(connectionString));
//builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseMySQL(connectionString));

// MS SQL Server
var connectionString = $"Server={databaseSettings.Server};" +
    $"Database={databaseSettings.Database};" +
    $"User Id={databaseSettings.Username};" +
    $"Password={databaseSettings.Password};" +
    $"Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true";
    //$"Integrated security=False;TrustServerCertificate=true";
    
builder.Services.AddDbContext<AuthenticationDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<DbContext, ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddIdentityApiEndpoints<ApplicationUser>().AddEntityFrameworkStores<AuthenticationDbContext>();
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddScoped<RajDataHandler>();
builder.Services.AddScoped<RajDataService>();
builder.Services.AddTransient<PrivilegeMiddleware>();

builder.Services.AddTransient<ModuleIdentityMiddleware>();

var smtpSettings = configuration.GetSection("SmtpSettings").Get<SmtpSettings>();
var emailSettings = configuration.GetSection("EmailSettings").Get<EmailSettings>();
builder.Services.AddSingleton(emailSettings);

var smtpClient = new SmtpClient(smtpSettings.Host, smtpSettings.Port);
smtpClient.EnableSsl = smtpSettings.EnableSsl;
if (smtpSettings.UseDefaultCredentials)
{
    smtpClient.UseDefaultCredentials = true;
}
else
{
    smtpClient.UseDefaultCredentials = false;
    smtpClient.Credentials = new System.Net.NetworkCredential(emailSettings.FromEmail, emailSettings.Password);

}

builder.Services.AddSingleton(smtpClient);
builder.Services.AddTransient<EmailService>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedEmail = true;
});

builder.Services.AddTransient<IEmailSender, EmailSender>();

//builder.Services.AddSpaStaticFiles(configuration =>
//{
//    configuration.RootPath = "ui";
//});

var app = builder.Build();

// Initialise ReactJS.NET. Must be before static files.
app.UseReact(config =>
{
    config
        .SetReuseJavaScriptEngines(true)
        .SetLoadBabel(false)
        .SetLoadReact(false)
        .SetReactAppBuildPath("~/");
});
//JsEngineSwitcher.Current.DefaultEngineName = V8JsEngine.EngineName;
//JsEngineSwitcher.Current.EngineFactories.AddV8();

app.UseDefaultFiles();
app.UseStaticFiles();

//app.UseCors(
//        options => options.WithOrigins("http://localhost:3000/").AllowAnyMethod().AllowAnyHeader()
//    );

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    //app.UseSwagger();
//    app.UseSwagger(c => c.RouteTemplate = Helper.GetSwaggerDoc());
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.MapGroup("/api/identity").MapIdentityApi<ApplicationUser>();

app.UseAuthorization();

app.UseMiddleware<PrivilegeMiddleware>();
app.UseMiddleware<ModuleIdentityMiddleware>();

app.MapControllers();

app.Run();

