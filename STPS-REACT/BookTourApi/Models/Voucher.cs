using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Voucher
    {
        [Key]
        public int Id { get; set; }

        public string VoucherName {  get; set; }

        public string VoucherDetail {  get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
