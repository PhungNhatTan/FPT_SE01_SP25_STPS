using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Request
{
    public class ResetPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string OTP { get; set; }
        
        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
        
        [Required]
        [Compare("NewPassword")]
        public string ConfirmPassword { get; set; }
    }
}
