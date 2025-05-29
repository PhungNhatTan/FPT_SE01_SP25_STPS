﻿using System.ComponentModel.DataAnnotations;

namespace BookTour.Dto.Request
{
    public class UpdateCustomTourRequest
    {
        [Required]
        public int CustomTourId { get; set; }

        [StringLength(100)]
        public string TourName { get; set; }

        public string Status { get; set; }

        public decimal? EstimatedPrice { get; set; }

        public List<int> DestinationIds { get; set; }
    }
}
