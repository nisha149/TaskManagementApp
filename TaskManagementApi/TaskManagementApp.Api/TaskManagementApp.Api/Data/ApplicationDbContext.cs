using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<TaskCategory> Categories { get; set; }
        public DbSet<TaskPriority> Priorities { get; set; }
    }
}