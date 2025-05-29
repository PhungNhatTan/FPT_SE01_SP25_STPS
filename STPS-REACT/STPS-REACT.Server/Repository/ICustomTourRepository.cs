using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Repository
{
    public interface ICustomTourRepository
    {
        Task<IEnumerable<CustomTour>> GetAllCustomToursAsync();
        Task<IEnumerable<CustomTour>> GetCustomToursByUserIdAsync(int userId);
        Task<CustomTour> GetCustomTourByIdAsync(int id);
        Task<CustomTour> CreateCustomTourAsync(CustomTour customTour);
        Task<IEnumerable<CustomTourDestination>> CreateCustomTourDestinationsAsync(IEnumerable<CustomTourDestination> destinations);
        Task<CustomTour> UpdateCustomTourAsync(CustomTour customTour);
        Task<bool> DeleteCustomTourDestinationsAsync(int customTourId);
        Task<bool> DeleteCustomTourAsync(int id);
    }
}
