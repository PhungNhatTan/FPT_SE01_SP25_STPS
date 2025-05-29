using STPS_REACT.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace STPS_REACT.Server.Repository.Impl
{
    public class VoucherRepository : IVoucherRepository
    {
        private readonly BookTourContext _context;
        public VoucherRepository(BookTourContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Voucher>> GetAllVouchersAsync()
        {
            return await _context.Voucher.ToListAsync();
        }

        public async Task<Voucher> GetVoucherByIdAsync(int id)
        {
            return await _context.Voucher.FindAsync(id);
        }

        public async Task<Voucher> AddVoucherAsync(Voucher voucher)
        {
            _context.Voucher.Add(voucher);
            await _context.SaveChangesAsync();
            return voucher;
        }

        public async Task<Voucher> UpdateVoucherAsync(Voucher voucher)
        {
            _context.Voucher.Update(voucher);
            await _context.SaveChangesAsync();
            return voucher;
        }

        public async Task<bool> DeleteVoucherAsync(int id)
        {
            var voucher = await _context.Voucher.FindAsync(id);
            if (voucher == null) return false;
            _context.Voucher.Remove(voucher);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 