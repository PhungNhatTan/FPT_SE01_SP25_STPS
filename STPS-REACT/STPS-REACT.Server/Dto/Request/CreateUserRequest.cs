namespace STPS_REACT.Server.Dto.Request
{
    public class CreateUserRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<int> RoleIds { get; set; }
    }
} 