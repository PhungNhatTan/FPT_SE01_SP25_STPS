using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;
using System.Collections.Generic;

namespace STPS_REACT.Server.DAO
{
    public class TcTourDAO
    {
        private readonly StpsContext _context;

        public TcTourDAO(StpsContext context)
        {
            _context = context;
        }

        public List<TcTourDTO> GetHomepageTour()
        {
            return _context.Tctours.GroupBy(a => new { a.TourId, a.Tour.TourName, a.Tc.TcId, a.Tc.TcName, a.Price, a.Tour.TourFeedbacks })
                .Select(tct => new TcTourDTO
            {
                TourId = tct.Key.TourId,
                TourName=tct.Key.TourName,
                TcId=tct.Key.TcId,
                TcName=tct.Key.TcName,
                price=tct.Key.Price
            }).OrderByDescending(a => a.avrRating).Take(5).ToList();
        }
    }
}
