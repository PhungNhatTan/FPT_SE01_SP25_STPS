using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.Repository
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetAllCitiesAsync();
        Task<City> GetCityByIdAsync(int id);
    }
}
