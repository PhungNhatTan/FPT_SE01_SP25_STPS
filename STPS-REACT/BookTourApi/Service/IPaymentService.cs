using BookTour.Dto.Response;
using BookTour.Models;

namespace BookTour.Service
{
    public interface IPaymentService
    {
        Task<PaymentQRResponse> CreatePaymentQR(int bookingId);
        Task<bool> ConfirmPayment(int bookingId, string transactionId);
        Task<PaymentTransaction> GetPaymentTransaction(int bookingId);
    }
}
