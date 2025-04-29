using Microsoft.EntityFrameworkCore;
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
            return _context.Tctours
                .Include(tct=>tct.Tour)
                .ThenInclude(t=>t.TourFeedbacks)
                .Include(tct=>tct.Tc)
                .GroupBy(a => new { a.TourId, a.Tour.TourName, a.Tc.TcId, a.Tc.TcName, a.Price })
                .Select(tct => new TcTourDTO
                {
                    TourId = tct.Key.TourId,
                    TourName = tct.Key.TourName,
                    TcId = tct.Key.TcId,
                    TcName = tct.Key.TcName,
                    price = tct.Key.Price,
                    AvrRating = tct.Average(a=>a.Tour.TourFeedbacks.Average(tf=>tf.Rating))
                }).OrderByDescending(a => a.AvrRating).Take(5).ToList();
        }

        public List<TcTourDTO> GetListTctour()
        {
            return _context.Tctours
                .Include(tct => tct.Tour)
                .ThenInclude(t => t.TourFeedbacks)
                .Include(tct => tct.Tc)
                .GroupBy(a => new { a.TourId, a.Tour.TourName, a.Tc.TcId, a.Tc.TcName, a.Price })
                .Select(tct => new TcTourDTO
                {
                    TourId = tct.Key.TourId,
                    TourName = tct.Key.TourName,
                    TcId = tct.Key.TcId,
                    TcName = tct.Key.TcName,
                    price = tct.Key.Price,
                    AvrRating = tct.Average(a => a.Tour.TourFeedbacks.Average(tf => tf.Rating))
                }).ToList();
        }

        public TcTourDTO GetTctour(string tctourID)
        {
            return _context.Tctours
                .Include(tct => tct.Tour)
                    .ThenInclude(t => t.TourFeedbacks)
                .Include(tct => tct.Tc)
                .GroupBy(a => new { a.TourId, a.Tour.TourName, a.Tc.TcId, a.Tc.TcName, a.Price })
                .Select(tct => new TcTourDTO
                {
                    TourId = tct.Key.TourId,
                    TourName = tct.Key.TourName,
                    TcId = tct.Key.TcId,
                    TcName = tct.Key.TcName,
                    price = tct.Key.Price,
                    AvrRating = tct.Average(a => a.Tour.TourFeedbacks.Average(tf => tf.Rating))
                }).Where(a => a.TourId == tctourID)
                .FirstOrDefault();
        }
    }
}
