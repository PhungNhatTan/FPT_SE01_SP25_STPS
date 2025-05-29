﻿using System.Threading.Tasks;
using STPS_REACT.Server.Dto.Request;

namespace STPS_REACT.Server.Service
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body, bool isHtml = true);
        Task SendBookingConfirmationAsync(string to, string customerName, string tourName, DateTime tourDate, int adultCount, int childCount, decimal totalPrice);
        Task<bool> SendBookingConfirmationEmailAsync(BookingEmailRequest request);
        Task<bool> SendPasswordResetOtpAsync(string to, string otp);
    }
}
