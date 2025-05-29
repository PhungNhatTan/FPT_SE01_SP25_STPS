using BookTour.Models;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Repository.Impl
{
    public class CityRepository : ICityRepository
    {
        private readonly BookTourContext _context;

        public CityRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<City>> GetAllCitiesAsync()
        {
            return await _context.Cities
                .Where(c => c.IsActive)
                .ToListAsync();
        }

        public async Task<City> GetCityByIdAsync(int id)
        {
            return await _context.Cities
                .Include(c => c.Destinations)
                    .ThenInclude(d => d.DestinationImages)
                .FirstOrDefaultAsync(c => c.CityId == id);
        }
    }
}