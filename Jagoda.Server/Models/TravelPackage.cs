namespace Jagoda.Server.Models
{
    public class TravelPackage
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Location { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
