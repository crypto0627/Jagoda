namespace Jagoda.Server.Models
{
    public class RegisterModel
    {
        public required string Email { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
