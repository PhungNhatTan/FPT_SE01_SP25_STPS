using System.Collections;
using Microsoft.EntityFrameworkCore;
using STPS_REACT.Server.DTO;
using STPS_REACT.Server.Models;

namespace STPS_REACT.Server.DAO
{
    public class PersonalizedTourDAO
    {
        private readonly StpsContext _context;
        public PersonalizedTourDAO(StpsContext context)
        {
            _context = context;
        }
        public List<PersonalizedTourDTO> getAllPTour(String userId)
        {
            return (List<PersonalizedTourDTO>)_context.PersonalizedTours
            .Include(i => i.Tour)
            .Select(p => new PersonalizedTourDTO
            {
                tourId = p.TourId,
                AccountId = p.AccountId
            }).Where(p => p.AccountId.Equals(userId));
        }
        public List<ReceiptsDTO> getPTour(String tourId)
        {
            return _context.Receipts
            .Include(i => i.Tour)
            .Select(i => new ReceiptsDTO
            {
                AccountId = i.AccountId,
                TourId = i.TourId,
                Amount = i.Amount,
                Date = i.Date
            }).Where(p => p.TourId==tourId).ToList();
        }
    }
}