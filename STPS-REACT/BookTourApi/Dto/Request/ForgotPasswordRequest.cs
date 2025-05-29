using System.ComponentModel.DataAnnotations;

namespace BookTour.Dto.Request
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
