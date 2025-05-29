using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STPS_REACT.Server.Models
{
    public class TourismCompany
    {
        [Key]
        public int Id { get; set; }

        public string CompanyName { get; set; }

        public string RepresentativeName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string TaxCode { get; set; }

        // Bank Account Information (for revenue transfer)
        public string BankName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankAccountHolderName { get; set; }

        // Foreign Key to User
        [ForeignKey("User")]
        public int UserId { get; set; }

        // Navigation Properties
        public virtual User User { get; set; }
        public virtual ICollection<Tour> Tours { get; set; }
        public virtual ICollection<RevenueTransaction> RevenueTransactions { get; set; }
    }
}
