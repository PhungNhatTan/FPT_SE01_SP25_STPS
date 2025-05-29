using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Request
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
