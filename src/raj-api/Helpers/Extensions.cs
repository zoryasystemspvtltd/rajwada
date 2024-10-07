using ILab.Extensionss.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace RajApi.Helpers;

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
}
