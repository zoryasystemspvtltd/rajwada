using ILab.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RajApi.Data;
using RajApi.Data.Models;
using RajApi.Data.Models.Reports;
using System.Security.Claims;

namespace RajApi.Controllers
{
    /// <summary>
    /// Work Progress Report Controller - Detailed work tracking and progress reporting
    /// Retrieves comprehensive activity data across company, project, and tower hierarchy
    /// </summary>
    [Route("api/work-progress-report")]
    [ApiController]
    [Authorize]
    public class WorkProgressReportController : ControllerBase
    {
        private readonly ILogger<WorkProgressReportController> logger;
        private readonly RajDataService dataService;

        public WorkProgressReportController(ILogger<WorkProgressReportController> logger, RajDataService dataService)
        {
            this.logger = logger;
            this.dataService = dataService;
        }

        /// <summary>
        /// Get detailed work progress report with all required fields
        /// Exposes: Company, Project, Inside/Outside, Tower, Floor, Flat, Room, Developer, 
        /// Contractor, Activities, Date, Cost, Engineer, Percentage of Work, Status, Is Approved
        /// </summary>
        /// <param name="request">Filter by CompanyId, ProjectId, TowerId</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>List of work progress records with all fields</returns>
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<WorkProgressReportDto>>> GetWorkProgressReportDetail(
            [FromBody] WorkProgressReportRequest? request,
            CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching work progress report with filters - CompanyId: {request?.CompanyId}, ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetWorkProgressReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetWorkProgressReportDetail: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
       

        /// <summary>
        /// Helper method to set user identity from JWT claims
        /// </summary>
        private void SetUserIdentity()
        {
            try
            {
                var member = User.Claims.FirstOrDefault(p => p.Type.Equals("activity-member"))?.Value ?? string.Empty;
                var key = User.Claims.FirstOrDefault(p => p.Type.Equals("activity-key"))?.Value ?? string.Empty;
                var roles = User.Claims
                    .Where(c => c.Type == ClaimTypes.Role)
                    .Select(c => c.Value)
                    .ToList();
                var isAdmin = roles.Any(r => r.Equals("ADMIN", StringComparison.OrdinalIgnoreCase));

                dataService.Identity = new ModuleIdentity(member, key, isAdmin);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in SetUserIdentity: '{ex.Message}'");
            }
        }
    }
}
