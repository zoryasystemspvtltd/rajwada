using ILab.Data;
using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using NSubstitute;
using RajApi.Controllers;
using RajApi.Data;
using RajApi.Data.Models;

namespace api_test.Controllers
{
    public class LabModelControllerTests
    {
        private readonly LabModelController controller;
        private readonly ILogger<RajDataService> logger;
        private readonly IConfiguration _configuration;
        public LabModelControllerTests()
        {
            logger = Substitute.For<ILogger<RajDataService>>();
            var controllerLogger = Substitute.For<ILogger<LabModelController>>();
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseInMemoryDatabase(databaseName: "test");
            var dbContext = new ApplicationDbContext(optionsBuilder.Options);
            var identity = new ModuleIdentity("DUMMY","DUMMY");
            var dataLogger = Substitute.For<ILogger<RajDataHandler>>();
            var labDataHandler = new RajDataHandler(dbContext, dataLogger);
            labDataHandler.Identity = identity;
            var subDynamicDataHandler = new RajDataService(labDataHandler, _configuration,logger);

            this.controller = new LabModelController(
                controllerLogger,
                subDynamicDataHandler);

            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            controller.ControllerContext.HttpContext.Request.Headers["DUMMY"] = "DUMMYT";
        }

        [Fact]
        public async Task Api_Integration_Success()
        {
            // Arrange
            string model = "LabModelLog";
            var data = new ApplicationLog()
            {
                Name = "Test",
                ActivityType = StatusType.Draft
            };

            // Act
            await controller.PostAsync(model, data, new CancellationToken());
            controller.Get(model);
            controller.Get(model, 1);
            data.Name = "DUMMY";
            await controller.PutAsync(model, 1, data, new CancellationToken());
            await controller.DeleteAsync(model, 1, new CancellationToken());


            Assert.True(true);
        }

    }
}
