using BookTour.Dto.Common;
using BookTour.Dto.Request;
using BookTour.Models;
using System.Threading.Tasks;

namespace BookTour.Service
{
    public interface IBookingService
    {
        Task<Booking> GetBookingById(int id);
        Task<Booking> CreateBooking(Booking booking);
        Task<Booking> UpdateBooking(Booking booking);
        Task<bool> DeleteBooking(int id);
        Task<IEnumerable<Booking>> GetAllBookings();
        Task<IEnumerable<Booking>> GetBookingsByUserId(int userId);
        Task<ApiResponse<bool>> CancelBookingAsync(int bookingId, CreateRefundRequestDto createRefundRequestDto);
    }
} 