using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DAO
{
    public class RegionDAO
    {
        private readonly StpsContext _context;

        public RegionDAO(StpsContext context)
        {
            _context = context;
        }

        public List<RegionDTO> getAll()
        {
            return _context.Regions.Select(r => new RegionDTO
            {
                RegionId = r.RegionId,
                RegionName=r.RegionName

            }).ToList();
        }
    }
}
