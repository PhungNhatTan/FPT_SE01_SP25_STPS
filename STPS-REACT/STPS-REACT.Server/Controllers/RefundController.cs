using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace STPS_REACT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RefundController : ControllerBase
    {
        private readonly IRefundService _refundService;
        private readonly ILogger<RefundController> _logger;

        public RefundController(IRefundService refundService, ILogger<RefundController> logger)
        {
            _refundService = refundService;
            _logger = logger;
        }

        [HttpGet("can-cancel/{bookingId}")]
        public async Task<IActionResult> CanCancelBooking(int bookingId)
        {
            try
            {
                var canCancel = await _refundService.CanCancelBooking(bookingId);
                return Ok(new { success = true, data = new { canCancel } });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error checking if booking {bookingId} can be cancelled");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRefundRequest([FromBody] CreateRefundRequestDto request)
        {
            try
            {
                var result = await _refundService.CreateRefundRequest(request);
                return Ok(new { success = true, data = result, message = "Refund request created successfully" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating refund request for booking {request.BookingId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetRefundRequest(int bookingId)
        {
            try
            {
                var refundRequest = await _refundService.GetRefundRequest(bookingId);
                if (refundRequest == null)
                {
                    return NotFound(new { success = false, message = "Refund request not found" });
                }
                return Ok(new { success = true, data = refundRequest });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting refund request for booking {bookingId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingRefunds()
        {
            try
            {
                var result = await _refundService.GetPendingRefunds();
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pending refunds");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("process/{refundRequestId}")]
        public async Task<IActionResult> ProcessRefund(int refundRequestId)
        {
            try
            {
                var result = await _refundService.ProcessRefund(refundRequestId);
                if (result)
                {
                    return Ok(new { success = true, message = "Refund processed successfully" });
                }
                return BadRequest(new { success = false, message = "Refund processing failed" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error processing refund {refundRequestId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }
}
