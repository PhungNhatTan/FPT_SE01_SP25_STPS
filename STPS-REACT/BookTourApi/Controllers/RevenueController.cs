using BookTour.Service;
using Microsoft.AspNetCore.Mvc;

namespace BookTour.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RevenueController : ControllerBase
    {
        private readonly IRevenueService _revenueService;
        private readonly ILogger<RevenueController> _logger;

        public RevenueController(IRevenueService revenueService, ILogger<RevenueController> logger)
        {
            _revenueService = revenueService;
            _logger = logger;
        }

        [HttpGet("company/{companyId}")]
        public async Task<IActionResult> GetCompanyRevenue(int companyId, [FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate)
        {
            try
            {
                var result = await _revenueService.GetCompanyRevenue(companyId, fromDate, toDate);
                return Ok(new { success = true, data = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting revenue for company {companyId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("admin/statistics")]
        public async Task<IActionResult> GetAdminRevenueStatistics([FromQuery] DateTime? fromDate, [FromQuery] DateTime? toDate)
        {
            try
            {
                var result = await _revenueService.GetAdminRevenueStatistics(fromDate, toDate);
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting admin revenue statistics");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("pending-transfers")]
        public async Task<IActionResult> GetPendingRevenueTransfers()
        {
            try
            {
                var result = await _revenueService.GetPendingRevenueTransfers();
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pending revenue transfers");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("process-transfers")]
        public async Task<IActionResult> ProcessScheduledRevenueTransfers()
        {
            try
            {
                await _revenueService.ProcessScheduledRevenueTransfers();
                return Ok(new { success = true, message = "Revenue transfers processed successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing scheduled revenue transfers");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("process-transfer/{transactionId}")]
        public async Task<IActionResult> ProcessRevenueTransfer(int transactionId)
        {
            try
            {
                var result = await _revenueService.ProcessRevenueTransfer(transactionId);
                if (result)
                {
                    return Ok(new { success = true, message = "Revenue transfer processed successfully" });
                }
                return BadRequest(new { success = false, message = "Revenue transfer processing failed" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing revenue transfer {transactionId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }
}
