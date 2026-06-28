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
        [HttpPost("work-transfer-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetWorkTransferReportDetail(
            [FromBody] WorkReportRequest? request,
            CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching work transfer report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetWorkTransferReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetWorkTransferReportDetail: '{ex.Message}'");
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

        [AllowAnonymous]
        [HttpPost("projectwise-budgetvsactual-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectwiseBudgetVsActualReport(
           [FromBody] WorkReportRequest? request,
           CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching project wise budget vs actual report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectwiseBudgetVsActualReportAsync(request, cancellationToken);

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

        [AllowAnonymous]
        [HttpPost("developerwise-work-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetDeveloperWiseWorkReport(
           [FromBody] WorkReportRequest? request, CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching developer wise work report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetDeveloperWiseWorkReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetDeveloperWiseWorkReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("contractorwise-work-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetContractorWiseWorkReport(
           [FromBody] WorkReportRequest? request, CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching contractor wise work report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetContractorWiseWorkReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetContractorWiseWorkReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("engineer-performance-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetEngineerPerformanceReport(
         [FromBody] WorkReportRequest? request,
         CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Engineer Performance report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetEngineerPerformanceReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetEngineerPerformanceReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("projectwise-notstarted-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseNotStartedReport(
         [FromBody] WorkReportRequest? request,
         CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise Not Started report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseNotStartedReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseNotStartedReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("projectwise-inprogress-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseInProgressReport(
        [FromBody] WorkReportRequest? request,
        CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise In Progress report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseInProgressReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseInProgressReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("projectwise-cancelled-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseCancelledReport(
        [FromBody] WorkReportRequest? request,
        CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise Cancelled report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseCancelledReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseCancelledReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("projectwise-closed-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseClosedReport(
       [FromBody] WorkReportRequest? request,
       CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise Closed report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseClosedReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseClosedReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("projectwise-rework-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetProjectWiseReworkReport(
       [FromBody] WorkReportRequest? request,
       CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching Project Wise ReWork report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetProjectWiseReWorkReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetProjectWiseReworkReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("contractorwise-work-amendment-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetContractorWiseWorkAmendmentReport(
          [FromBody] WorkReportRequest? request, CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching contractor wise work amendment report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetContractorWiseWorkAmendmentReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetContractorWiseWorkAmendmentReport: '{ex.Message}'");
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("developerwise-work-amendment-report")]
        public async Task<ActionResult<IEnumerable<WorkReportDto>>> GetDeveloperWiseWorkAmendmentReport(
          [FromBody] WorkReportRequest? request, CancellationToken cancellationToken)
        {
            try
            {
                //SetUserIdentity();
                logger.LogInformation($"Fetching developer wise work amendment report with filters - ProjectId: {request?.ProjectId}, TowerId: {request?.TowerId}");

                var result = await dataService.GetDeveloperWiseWorkAmendmentReportAsync(request, cancellationToken);

                return Ok(new
                {
                    success = true,
                    totalRecords = result.Count,
                    data = result
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Exception in GetDeveloperWiseWorkAmendmentReport: '{ex.Message}'");
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
