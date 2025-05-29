using System;
using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Models
{
    public class PasswordReset
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string OTP { get; set; }
        
        [Required]
        public DateTime ExpiryDate { get; set; }
        
        public bool IsUsed { get; set; } = false;
    }
}
