using ILab.io;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace IlabAuthentication.Helpers
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger<EmailSender> _logger;
        private readonly EmailService _emailService;
        private readonly EmailSettings _settings;
        public EmailSender(ILogger<EmailSender> logger,
            EmailService emailService,
            EmailSettings settings)
        {
            _logger = logger;
            _emailService = emailService;
            _settings = settings;
        }
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            //https://learn.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-8.0
            var recipients = new string[1] { email };

            var task = Task.Run(() =>
            {
                _emailService.Send(new LabMailMessage()
                {
                    From = _settings.FromEmail,
                    IsBodyHtml = true,
                    Recipients = recipients,
                    Subject = subject,
                    Body = htmlMessage
                });
            });

            await task;
        }
    }
}
