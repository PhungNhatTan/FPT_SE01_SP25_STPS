using BookTour.Models;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Repository.Impl
{
    public class TourRepository : ITourRepository
    {
        private readonly BookTourContext _context;

        public TourRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tour>> GetAllToursAsync()
        {
            return await _context.Tours
                .Include(t => t.TourImages)
                .Where(t => t.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<Tour>> GetFeaturedToursAsync()
        {
            return await _context.Tours
                .Include(t => t.TourImages)
                .Where(t => t.IsActive && t.IsFeatured)
                .ToListAsync();
        }

        public async Task<Tour> GetTourByIdAsync(int id)
        {
            return await _context.Tours
                .Include(t => t.TourImages)
                .Include(t => t.TourSchedules)
                .Include(t => t.TourDestinations)
                    .ThenInclude(td => td.Destination)
                        .ThenInclude(d => d.DestinationImages)
                .Include(t => t.Reviews)
                    .ThenInclude(r => r.User)
                .FirstOrDefaultAsync(t => t.TourId == id);
        }

        public async Task<IEnumerable<Tour>> SearchToursAsync(string destination, decimal? minPrice, decimal? maxPrice, int? duration)
        {
            var query = _context.Tours.AsQueryable();

            if (!string.IsNullOrEmpty(destination))
            {
                query = query.Where(t => t.TourDestinations.Any(td =>
                    td.Destination.DestinationName.Contains(destination) ||
                    td.Destination.City.CityName.Contains(destination)));
            }

            if (minPrice.HasValue)
            {
                query = query.Where(t => t.AdultPrice >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                query = query.Where(t => t.AdultPrice <= maxPrice.Value);
            }
            if (duration.HasValue)
            {
                query = query.Where(t => t.Duration == duration.Value);
            }

            return await query
                .Include(t => t.TourImages)
                .Where(t => t.IsActive)
                .ToListAsync();
        }

        public async Task<Booking> CreateBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<IEnumerable<BookingDetail>> CreateBookingDetailsAsync(IEnumerable<BookingDetail> bookingDetails)
        {
            _context.BookingDetails.AddRange(bookingDetails);
            await _context.SaveChangesAsync();
            return bookingDetails;
        }


        public async Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(int userId)
        {
            return await _context.Bookings
                .Include(b => b.Tour)
                .ThenInclude(t => t.TourImages)
                .Where(b => b.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Tour>> GetToursByCompanyIdAsync(int companyId)
        {
            return await _context.Tours
                .Include(t => t.TourImages)
                .Include(t => t.TourismCompany)
                .Where(t => t.TourismCompanyId == companyId && t.IsActive)
                .ToListAsync();
        }

        public async Task<Tour> AddTourAsync(Tour tour)
        {
            _context.Tours.Add(tour);
            await _context.SaveChangesAsync();
            return tour;
        }

        public async Task<Tour> UpdateTourAsync(Tour tour)
        {
            _context.Tours.Update(tour);
            await _context.SaveChangesAsync();
            return tour;
        }

        public async Task<bool> DeleteTourAsync(int id)
        {
            var tour = await _context.Tours.FindAsync(id);
            if (tour == null) return false;
            _context.Tours.Remove(tour);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}