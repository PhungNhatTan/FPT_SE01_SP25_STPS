using BookTour.Dto.Response;
using BookTour.Models;
using Microsoft.AspNetCore.Http;

namespace BookTour.Service
{
    public interface IPaymentService
    {
        Task<PaymentQRResponse> CreatePaymentQR(int bookingId);
        Task<PaymentTransaction> GetPaymentTransaction(int bookingId);
        Task<VNPayPaymentResponse> CreateVNPayPayment(int bookingId, double amount, string description, string ipAddress);
        Task<(bool success, string redirectUrl)> HandleVNPayCallback(IQueryCollection query);
    }
}
