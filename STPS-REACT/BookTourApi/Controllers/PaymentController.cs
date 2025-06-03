using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Dto.Response;
using BookTour.Models;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;
using VNPAY.NET;
using VNPAY.NET.Enums;
using VNPAY.NET.Models;
using VNPAY.NET.Utilities;

namespace BookTourApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<PaymentController> _logger;
        private readonly IVnpay _vnpay;

        public PaymentController(IPaymentService paymentService, IConfiguration configuration, ILogger<PaymentController> logger, IVnpay vnpay)
        {
            _paymentService = paymentService;
            _configuration = configuration;
            _logger = logger;
            _vnpay = vnpay;
        }

        [HttpPost("create-qr/{bookingId}")]
        public async Task<IActionResult> CreatePaymentQR(int bookingId, [FromBody] CreatePaymentQRRequest request)
        {
            try
            {
                var ipAddress = NetworkHelper.GetIpAddress(HttpContext);
                var response = await _paymentService.CreateVNPayPayment(bookingId, request.MoneyToPay, request.Description, ipAddress);
                return Ok(new ApiResponse<VNPayPaymentResponse>
                {
                    Success = true,
                    Message = "Payment URL created successfully",
                    Data = response
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating payment QR for booking {BookingId}", bookingId);
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
    
        [HttpGet("vnpay-callback")]
        public async Task<IActionResult> VNPayCallback()
        {
            try
            {
                var (success, redirectUrl) = await _paymentService.HandleVNPayCallback(Request.Query);
                return Redirect(redirectUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing VNPay callback");
                return Redirect($"{_configuration["Frontend:Url"]}/booking?error=system_error");
            }
        }

        //[HttpPost("confirm/{bookingId}")]
        //public async Task<IActionResult> ConfirmPayment(int bookingId, [FromBody] ConfirmPaymentRequest request)
        //{
        //    try
        //    {
        //        var result = await _paymentService.ConfirmPayment(bookingId, request.TransactionId);
        //        return Ok(new ApiResponse<bool>
        //        {
        //            Success = true,
        //            Message = "Payment confirmed successfully",
        //            Data = result
        //        });
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error confirming payment for booking {BookingId}", bookingId);
        //        return BadRequest(new ApiResponse<object>
        //        {
        //            Success = false,
        //            Message = ex.Message
        //        });
        //    }
        //}

        [HttpGet("transaction/{bookingId}")]
        public async Task<IActionResult> GetPaymentTransaction(int bookingId)
        {
            try
            {
                var transaction = await _paymentService.GetPaymentTransaction(bookingId);
                return Ok(new ApiResponse<PaymentTransaction>
                {
                    Success = true,
                    Message = "Payment transaction retrieved successfully",
                    Data = transaction
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting payment transaction for booking {BookingId}", bookingId);
                return BadRequest(new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
    }

    public class CreatePaymentQRRequest
    {
        public double MoneyToPay { get; set; }
        public string Description { get; set; }
    }

    public class ConfirmPaymentRequest
    {
        public string TransactionId { get; set; }
    }
}
