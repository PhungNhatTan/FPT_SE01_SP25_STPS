using STPS_REACT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace STPS_REACT.Server.Repository.Impl
{
    public class CustomTourRepository : ICustomTourRepository
    {
        private readonly BookTourContext _context;

        public CustomTourRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomTour>> GetAllCustomToursAsync()
        {
            return await _context.CustomTours
                .Include(ct => ct.User)
                .Include(ct => ct.CustomTourDestinations)
                    .ThenInclude(ctd => ctd.Destination)
                        .ThenInclude(d => d.City)
                .ToListAsync();
        }

        public async Task<IEnumerable<CustomTour>> GetCustomToursByUserIdAsync(int userId)
        {
            return await _context.CustomTours
                .Include(ct => ct.User)
                .Include(ct => ct.CustomTourDestinations)
                    .ThenInclude(ctd => ctd.Destination)
                        .ThenInclude(d => d.City)
                .Where(ct => ct.UserId == userId)
                .ToListAsync();
        }

        public async Task<CustomTour> GetCustomTourByIdAsync(int id)
        {
            return await _context.CustomTours
                .Include(ct => ct.User)
                .Include(ct => ct.CustomTourDestinations)
                    .ThenInclude(ctd => ctd.Destination)
                        .ThenInclude(d => d.City)
                .FirstOrDefaultAsync(ct => ct.CustomTourId == id);
        }

        public async Task<CustomTour> CreateCustomTourAsync(CustomTour customTour)
        {
            _context.CustomTours.Add(customTour);
            await _context.SaveChangesAsync();
            return customTour;
        }

        public async Task<IEnumerable<CustomTourDestination>> CreateCustomTourDestinationsAsync(IEnumerable<CustomTourDestination> destinations)
        {
            _context.CustomTourDestinations.AddRange(destinations);
            await _context.SaveChangesAsync();
            return destinations;
        }

        public async Task<CustomTour> UpdateCustomTourAsync(CustomTour customTour)
        {
            _context.CustomTours.Update(customTour);
            await _context.SaveChangesAsync();
            return customTour;
        }

        public async Task<bool> DeleteCustomTourDestinationsAsync(int customTourId)
        {
            var destinations = await _context.CustomTourDestinations
                .Where(ctd => ctd.CustomTourId == customTourId)
                .ToListAsync();

            if (destinations.Any())
            {
                _context.CustomTourDestinations.RemoveRange(destinations);
                await _context.SaveChangesAsync();
            }

            return true;
        }

        public async Task<bool> DeleteCustomTourAsync(int id)
        {
            var customTour = await _context.CustomTours.FindAsync(id);
            if (customTour == null)
                return false;

            _context.CustomTours.Remove(customTour);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
