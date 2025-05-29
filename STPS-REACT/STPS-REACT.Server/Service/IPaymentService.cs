using STPS_REACT.Server.Dto.Response;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Service
{
    public interface IPaymentService
    {
        Task<PaymentQRResponse> CreatePaymentQR(int bookingId);
        Task<bool> ConfirmPayment(int bookingId, string transactionId);
        Task<PaymentTransaction> GetPaymentTransaction(int bookingId);
    }
}
