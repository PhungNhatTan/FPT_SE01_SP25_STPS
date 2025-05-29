using System.ComponentModel.DataAnnotations;

namespace BookTour.Dto.Request
{
    public class VerifyOtpRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string OTP { get; set; }
    }
}
