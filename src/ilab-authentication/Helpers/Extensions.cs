using ILab.Extensionss.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using System.Text;

namespace IlabAuthentication.Helpers;

public static class Extensions
{
    public static ListOptions GetApiOption(this ControllerBase controller)
    {
        var apiOption = new StringValues();
        controller.HttpContext.Request.Headers.TryGetValue("ApiOption", out apiOption);
        if (apiOption.Count() == 0)
        {
            return new ListOptions();
            //throw new KeyNotFoundException("Invalid Option specified");
        }

        var option = JsonConvert.DeserializeObject<ListOptions>(apiOption.FirstOrDefault(),
        new JsonSerializerSettings()
        {
            ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
        });
        return option;
    }

    /// <summary>
    /// Convert Camel Case to dash separated string
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public static string ToUnderscoreCase(this string input)
    {
        StringBuilder sb = new StringBuilder();
        bool start_of_word = true;
        foreach (char ch in input)
        {
            if (char.IsUpper(ch))
                if (!start_of_word) sb.Append("-");

            sb.Append(ch.ToString().ToLower());

            start_of_word = char.IsWhiteSpace(ch);
        }
        return sb.ToString();
    }
}

public class ListOptions
{
    public int RecordPerPage { get; set; } = 10;//PageSize
    public int CurrentPage { get; set; } = 1;

    public string? SortColumnName { get; set; }
    public bool SortDirection { get; set; } = false;
    public Condition? SearchCondition { get; set; }

}


