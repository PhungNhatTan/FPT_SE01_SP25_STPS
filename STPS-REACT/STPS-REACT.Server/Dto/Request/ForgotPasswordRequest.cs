using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Request
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
