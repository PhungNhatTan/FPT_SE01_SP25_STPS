using BookTour.Service;
using Microsoft.AspNetCore.Mvc;

namespace BookTour.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(IPaymentService paymentService, ILogger<PaymentController> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }

        [HttpPost("create-qr/{bookingId}")]
        public async Task<IActionResult> CreatePaymentQR(int bookingId)
        {
            try
            {
                var result = await _paymentService.CreatePaymentQR(bookingId);
                return Ok(new { success = true, data = result });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating payment QR for booking {bookingId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("confirm/{bookingId}")]
        public async Task<IActionResult> ConfirmPayment(int bookingId, [FromBody] BookTour.Controllers.ConfirmPaymentRequest request)
        {
            try
            {
                var result = await _paymentService.ConfirmPayment(bookingId, request.TransactionId);
                if (result)
                {
                    return Ok(new { success = true, message = "Payment confirmed successfully" });
                }
                return BadRequest(new { success = false, message = "Payment confirmation failed" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirming payment for booking {bookingId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpGet("transaction/{bookingId}")]
        public async Task<IActionResult> GetPaymentTransaction(int bookingId)
        {
            try
            {
                var transaction = await _paymentService.GetPaymentTransaction(bookingId);
                if (transaction == null)
                {
                    return NotFound(new { success = false, message = "Payment transaction not found" });
                }
                return Ok(new { success = true, data = transaction });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error getting payment transaction for booking {bookingId}");
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }


}
