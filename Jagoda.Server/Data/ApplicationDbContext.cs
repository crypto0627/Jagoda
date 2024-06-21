using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Jagoda.Server.Models;

namespace Jagoda.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<TravelPackage> TravelPackages { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TravelPackage>().HasKey(tp => tp.Id);
            modelBuilder.Entity<TravelPackage>()
                .Property(tp => tp.Price)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Booking>().HasKey(b => b.Id);
            modelBuilder.Entity<Booking>()
                .Property(b => b.TotalPrice)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.TravelPackage)
                .WithMany(tp => tp.Bookings)
                .HasForeignKey(b => b.TravelPackageId);
        }
    }
}
