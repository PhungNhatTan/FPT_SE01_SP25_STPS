using STPS_REACT.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Repository.Impl
{
    public class TourismCompanyRepository : ITourismCompanyRepository
    {
        private readonly BookTourContext _context;

        public TourismCompanyRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<List<TourismCompany>> GetAllCompaniesAsync()
        {
            return await _context.TourismCompanies.ToListAsync();
        }

        public async Task<TourismCompany> GetCompanyByIdAsync(int id)
        {
            return await _context.TourismCompanies.FindAsync(id);
        }

        public async Task<TourismCompany> CreateCompanyAsync(TourismCompany company)
        {
            _context.TourismCompanies.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task UpdateCompanyAsync(TourismCompany company)
        {
            _context.Entry(company).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteCompanyAsync(int id)
        {
            var company = await _context.TourismCompanies.FindAsync(id);
            if (company == null)
            {
                return false;
            }
            _context.TourismCompanies.Remove(company);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TourismCompany> GetCompanyByUserIdAsync(int userId)
        {
            return await _context.TourismCompanies
                .Include(tc => tc.User)
                .Include(tc => tc.Tours)
                .FirstOrDefaultAsync(tc => tc.UserId == userId);
        }
    }
}