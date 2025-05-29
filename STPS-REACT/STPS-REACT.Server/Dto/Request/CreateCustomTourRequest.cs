﻿using System.ComponentModel.DataAnnotations;

namespace STPS_REACT.Server.Dto.Request
{
    public class CreateCustomTourRequest
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(100)]
        public string TourName { get; set; }

        [Required]
        public List<int> DestinationIds { get; set; }

        public decimal? EstimatedPrice { get; set; }
    }
}
