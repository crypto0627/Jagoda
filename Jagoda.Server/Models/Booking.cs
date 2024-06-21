namespace Jagoda.Server.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = new ApplicationUser();
        public int TravelPackageId { get; set; }
        public TravelPackage TravelPackage { get; set; } = new TravelPackage();
        public DateTime BookingDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
