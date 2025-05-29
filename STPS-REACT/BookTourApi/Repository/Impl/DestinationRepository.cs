using BookTour.Models;
using Microsoft.EntityFrameworkCore;

namespace BookTour.Repository.Impl
{
    public class DestinationRepository : IDestinationRepository
    {
        private readonly BookTourContext _context;

        public DestinationRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Destination>> GetAllDestinationsAsync()
        {
            return await _context.Destinations
                .Include(d => d.City)
                .Include(d => d.DestinationImages)
                .Where(d => d.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<Destination>> GetFeaturedDestinationsAsync()
        {
            return await _context.Destinations
                .Include(d => d.City)
                .Include(d => d.DestinationImages)
                .Where(d => d.IsActive && d.IsFeatured)
                .ToListAsync();
        }

        public async Task<Destination> GetDestinationByIdAsync(int id)
        {
            return await _context.Destinations
                .Include(d => d.City)
                .Include(d => d.DestinationImages)
                .Include(d => d.DestinationDetails)
                .Include(d => d.TourDestinations)
                    .ThenInclude(td => td.Tour)
                        .ThenInclude(t => t.TourImages)
                .FirstOrDefaultAsync(d => d.DestinationId == id);
        }

        public async Task<IEnumerable<Destination>> GetDestinationsByCityIdAsync(int cityId)
        {
            return await _context.Destinations
                .Include(d => d.City)
                .Include(d => d.DestinationImages)
                .Where(d => d.IsActive && d.CityId == cityId)
                .ToListAsync();
        }

        public async Task<Destination> AddDestinationAsync(Destination destination)
        {
            _context.Destinations.Add(destination);
            await _context.SaveChangesAsync();
            return destination;
        }

        public async Task<Destination> UpdateDestinationAsync(Destination destination)
        {
            _context.Entry(destination).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return destination;
        }

        public async Task<bool> DeleteDestinationAsync(int id)
        {
            var destination = await _context.Destinations.FindAsync(id);
            if (destination == null) return false;
            destination.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<DestinationImage> AddDestinationImageAsync(DestinationImage image)
        {
            _context.DestinationImages.Add(image);
            await _context.SaveChangesAsync();
            return image;
        }

        public async Task<bool> DeleteDestinationImageAsync(int imageId)
        {
            var image = await _context.DestinationImages.FindAsync(imageId);
            if (image == null) return false;
            _context.DestinationImages.Remove(image);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<DestinationDetail> AddDestinationDetailAsync(DestinationDetail detail)
        {
            _context.DestinationDetails.Add(detail);
            await _context.SaveChangesAsync();
            return detail;
        }

        public async Task<bool> DeleteDestinationDetailAsync(int detailId)
        {
            var detail = await _context.DestinationDetails.FindAsync(detailId);
            if (detail == null) return false;
            _context.DestinationDetails.Remove(detail);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}