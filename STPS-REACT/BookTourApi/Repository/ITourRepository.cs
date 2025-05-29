using BookTour.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace BookTour.Repository
{
    public interface ITourRepository
    {
        Task<IEnumerable<Tour>> GetAllToursAsync();
        Task<IEnumerable<Tour>> GetFeaturedToursAsync();
        Task<Tour> GetTourByIdAsync(int id);
        Task<IEnumerable<Tour>> SearchToursAsync(string destination, decimal? minPrice, decimal? maxPrice, int? duration);
        Task<Booking> CreateBookingAsync(Booking booking);
        Task<IEnumerable<BookingDetail>> CreateBookingDetailsAsync(IEnumerable<BookingDetail> bookingDetails);
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(int userId);
        // New method for TourismCompany relationship
        Task<IEnumerable<Tour>> GetToursByCompanyIdAsync(int companyId);
        // CRUD
        Task<Tour> AddTourAsync(Tour tour);
        Task<Tour> UpdateTourAsync(Tour tour);
        Task<bool> DeleteTourAsync(int id);
    }
}
