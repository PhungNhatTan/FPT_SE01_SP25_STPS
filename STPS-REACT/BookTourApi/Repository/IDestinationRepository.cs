using BookTour.Models;

namespace BookTour.Repository
{
    public interface IDestinationRepository
    {
        Task<IEnumerable<Destination>> GetAllDestinationsAsync();
        Task<IEnumerable<Destination>> GetFeaturedDestinationsAsync();
        Task<Destination> GetDestinationByIdAsync(int id);
        Task<IEnumerable<Destination>> GetDestinationsByCityIdAsync(int cityId);
        // CRUD operations
        Task<Destination> AddDestinationAsync(Destination destination);
        Task<Destination> UpdateDestinationAsync(Destination destination);
        Task<bool> DeleteDestinationAsync(int id);
        Task<DestinationImage> AddDestinationImageAsync(DestinationImage image);
        Task<bool> DeleteDestinationImageAsync(int imageId);
        Task<DestinationDetail> AddDestinationDetailAsync(DestinationDetail detail);
        Task<bool> DeleteDestinationDetailAsync(int detailId);
    }
}
