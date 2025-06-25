using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Data
{
    public static class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Priorities.Any())
            {
                context.Priorities.AddRange(
                    new TaskPriority { Name = "Low" },
                    new TaskPriority { Name = "Medium" },
                    new TaskPriority { Name = "High" }
                );
            }

            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new TaskCategory { Name = "Personal" },
                    new TaskCategory { Name = "Work" },
                    new TaskCategory { Name = "Others" }
                );
            }

            context.SaveChanges();
        }
    }
}
