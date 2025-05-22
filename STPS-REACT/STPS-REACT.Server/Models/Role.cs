using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }

        [StringLength(50)]
        public string RoleName { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
