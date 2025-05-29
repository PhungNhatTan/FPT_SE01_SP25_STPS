using BookTour.Dto.Request;
using BookTour.Models;

namespace BookTour.Service
{
    public interface IRefundService
    {
        Task<bool> CanCancelBooking(int bookingId);
        Task<RefundRequest> CreateRefundRequest(CreateRefundRequestDto request);
        Task<bool> ProcessRefund(int refundRequestId);
        Task<RefundRequest> GetRefundRequest(int bookingId);
        Task<List<RefundRequest>> GetPendingRefunds();
    }
}
