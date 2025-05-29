using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookTour.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }


        public string FullName { get; set; }

        public string Email { get; set; }


        public string Phone { get; set; }

        public string Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? LastLogin { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<SavedTour> SavedTours { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<CustomTour> CustomTours { get; set; }

        // Navigation Property for TourismCompany (1-1 relationship)
        public virtual TourismCompany TourismCompany { get; set; }
    }
}