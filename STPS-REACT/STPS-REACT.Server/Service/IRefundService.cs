using STPS_REACT.Server.Dto.Request;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Service
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
