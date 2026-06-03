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
    [Route("api")]
    [ApiController]
    [Authorize]
    public class WorkReportController : ControllerBase
    {
        private readonly ILogger<WorkReportController> logger;
        private readonly RajDataService dataService;

        public WorkReportController(ILogger<WorkReportController> logger, RajDataService dataService)
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
        [HttpPost("work-progress-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetWorkProgressReportDetail(
            [FromBody] WorkReportRequest? request,
            CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching work progress report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

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

        [AllowAnonymous]
        [HttpPost("projectwise-onhold-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseOnHoldReport(
            [FromBody] WorkReportRequest? request,
            CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise On Hold report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseOnHoldReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseOnHoldReportDetail: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


        [AllowAnonymous]
        [HttpPost("activitywise-budgetvsactual-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetActivitywiseBudgetVsActualReport(
           [FromBody] WorkReportRequest? request,
           CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching activity wise budget vs actual report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetActivitywiseBudgetVsActualReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetActivitywiseBudgetVsActualReport: '{ex.Message}'");
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
