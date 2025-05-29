using BookTour.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookTour.Repository
{
    public interface IVoucherRepository
    {
        Task<IEnumerable<Voucher>> GetAllVouchersAsync();
        Task<Voucher> GetVoucherByIdAsync(int id);
        Task<Voucher> AddVoucherAsync(Voucher voucher);
        Task<Voucher> UpdateVoucherAsync(Voucher voucher);
        Task<bool> DeleteVoucherAsync(int id);
    }
} 