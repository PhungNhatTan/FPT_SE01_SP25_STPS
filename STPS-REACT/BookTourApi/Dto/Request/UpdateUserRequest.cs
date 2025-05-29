namespace BookTour.Dto.Request
{
    public class UpdateUserRequest
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public List<int> RoleIds { get; set; }
    }
}