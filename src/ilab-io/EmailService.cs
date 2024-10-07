using Microsoft.Extensions.Logging;
using System.Net.Mail;

namespace ILab.io;

public class LabMailMessage
{
    public string From { get; set; }
    public string[] Recipients { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public bool IsBodyHtml { get; set; }
}
public class EmailService
{
    private readonly SmtpClient _smtpClient;
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> _logger,
        SmtpClient smtpClient)
    {
        _logger = _logger;
        _smtpClient = smtpClient;
    }

    public void Send(LabMailMessage message)
    {
        MailMessage mail = new MailMessage();

        mail.From = new MailAddress(message.From);
        mail.Subject = message.Subject;
        mail.IsBodyHtml = message.IsBodyHtml;
        mail.Body = message.Body;

        foreach (var to in message.Recipients)
        {
            mail.To.Add(to);
        }
        if (message.Recipients.Length > 0)
        {
            _smtpClient.Send(mail);
        }
    }
}
