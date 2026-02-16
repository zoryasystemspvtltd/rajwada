using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RajApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly ILogger<FileController> logger;
        private readonly RajDataService dataService;
        public FileController(ILogger<FileController> logger, RajDataService dataService)
        {
            this.logger = logger;
            this.dataService = dataService;
        }

        [AllowAnonymous]
        [HttpGet("{fileName}")]
        public async Task<IActionResult> Get(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("FileName is required.");

            if (fileName.Contains(".."))
                return BadRequest("Invalid file name.");
            try
            {
                string base64String = dataService.GetFileFromFileSystem(fileName);
                return Ok(new
                {
                    FileName = fileName,
                    Base64 = base64String
                });
            }
            catch (Exception ex)
            {
                logger.LogError("ConvertToBase64:" + ex.Message);
                return StatusCode(500, ex.Message);
            }
        }
    }
}
