using STPS_REACT.Server.Dto.Common;
using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Service;
using Microsoft.AspNetCore.Mvc;

namespace STPS_REACT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly ITourService _tourService;
        private readonly IPaymentService _paymentService;
        private readonly IRefundService _refundService;

        public ToursController(ITourService tourService, IPaymentService paymentService, IRefundService refundService)
        {
            _tourService = tourService;
            _paymentService = paymentService;
            _refundService = refundService;
        }

        // GET: api/Tours
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetTours()
        {
            var response = await _tourService.GetAllToursAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Tours/Featured
        [HttpGet("Featured")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetFeaturedTours()
        {
            var response = await _tourService.GetFeaturedToursAsync();
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        // GET: api/Tours/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TourDetailResponse>>> GetTour(int id)
        {
            var response = await _tourService.GetTourByIdAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost("Search")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> SearchTours(SearchTourRequest request)
        {
            var response = await _tourService.SearchToursAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost("Book")]
        public async Task<ActionResult<ApiResponse<BookingResponse>>> BookTour(BookTourRequest request)
        {
            Console.WriteLine($"BookTour API called with request: {System.Text.Json.JsonSerializer.Serialize(request)}");

            if (request == null)
            {
                return BadRequest(ApiResponse<BookingResponse>.ErrorResponse("Request không hợp lệ"));
            }

            if (request.TourId <= 0)
            {
                return BadRequest(ApiResponse<BookingResponse>.ErrorResponse($"TourId không hợp lệ: {request.TourId}"));
            }

            var response = await _tourService.BookTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }


        [HttpGet("BookingHistory/{userId}")]
        public async Task<ActionResult<ApiResponse<List<BookingResponse>>>> GetBookingHistory(int userId)
        {
            var response = await _tourService.GetBookingHistoryAsync(userId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpGet("Company/{companyId}")]
        public async Task<ActionResult<ApiResponse<List<TourResponse>>>> GetToursByCompany(int companyId)
        {
            var response = await _tourService.GetToursByCompanyIdAsync(companyId);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<TourResponse>>> AddTour([FromBody] CreateTourRequest request)
        {
            var response = await _tourService.AddTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TourResponse>>> UpdateTour(int id, [FromBody] UpdateTourRequest request)
        {
            if (id != request.TourId)
            {
                return BadRequest(ApiResponse<TourResponse>.ErrorResponse("Id không khớp"));
            }
            var response = await _tourService.UpdateTourAsync(request);
            if (response.Success)
            {
                return Ok(response);
            }
            return StatusCode(500, response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteTour(int id)
        {
            var response = await _tourService.DeleteTourAsync(id);
            if (response.Success)
            {
                return Ok(response);
            }
            if (response.Message == "Tour không tồn tại")
            {
                return NotFound(response);
            }
            return StatusCode(500, response);
        }

        [HttpPost("Payment/CreateQR/{bookingId}")]
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
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("Payment/Confirm/{bookingId}")]
        public async Task<IActionResult> ConfirmPayment(int bookingId, [FromBody] ConfirmPaymentRequest request)
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
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
        [HttpGet("Booking/CanCancel/{bookingId}")]
        public async Task<IActionResult> CanCancelBooking(int bookingId)
        {
            try
            {
                var canCancel = await _refundService.CanCancelBooking(bookingId);
                return Ok(new { success = true, data = new { canCancel } });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }

        [HttpPost("Booking/Cancel")]
        public async Task<IActionResult> CancelBooking([FromBody] CreateRefundRequestDto request)
        {
            try
            {
                var result = await _refundService.CreateRefundRequest(request);
                return Ok(new { success = true, data = result, message = "Booking cancelled successfully" });
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
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }

    public class ConfirmPaymentRequest
    {
        public string TransactionId { get; set; }
    }
}