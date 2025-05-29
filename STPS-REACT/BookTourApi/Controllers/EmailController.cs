﻿using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Service;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Text;

namespace BookTour.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public EmailController(IConfiguration configuration, IEmailService emailService)
        {
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpPost("SendBookingConfirmation")]
        public async Task<IActionResult> SendBookingConfirmation([FromBody] BookingEmailRequest request)
        {
            try
            {
                Console.WriteLine($"Received email request: {System.Text.Json.JsonSerializer.Serialize(request)}");

                if (request == null)
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Request không hợp lệ"));
                }

                if (string.IsNullOrEmpty(request.RecipientEmail))
                {
                    return BadRequest(ApiResponse<object>.ErrorResponse("Email người nhận không được để trống"));
                }

                Console.WriteLine($"Sending email to: {request.RecipientEmail}");

                if (string.IsNullOrEmpty(request.Subject))
                {
                    request.Subject = "Xác nhận đặt tour thành công";
                }

                if (string.IsNullOrEmpty(request.TourName))
                {
                    request.TourName = "Tour du lịch";
                }

                if (string.IsNullOrEmpty(request.BookingDate))
                {
                    request.BookingDate = DateTime.Now.ToString("yyyy-MM-dd");
                }

                if (string.IsNullOrEmpty(request.BookingId))
                {
                    request.BookingId = "BK" + new Random().Next(10000, 99999).ToString();
                }

                if (request.Destinations == null)
                {
                    request.Destinations = new List<string> { "Địa điểm du lịch" };
                }
                var result = await _emailService.SendBookingConfirmationEmailAsync(request);

                if (result)
                {
                    return Ok(ApiResponse<object>.SuccessResponse(new {}, "Email xác nhận đặt tour đã được gửi thành công"));
                }
                else
                {
                    return StatusCode(500, ApiResponse<object>.ErrorResponse("Không thể gửi email xác nhận"));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in SendBookingConfirmation: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, ApiResponse<object>.ErrorResponse($"Lỗi khi gửi email: {ex.Message}"));
            }
        }
    }
}
