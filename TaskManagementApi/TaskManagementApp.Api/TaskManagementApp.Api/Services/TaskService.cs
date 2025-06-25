using Microsoft.EntityFrameworkCore;
using TaskManagementApp.Api.Data;
using TaskManagementApp.Api.DTOs;
using TaskManagementApp.Api.Models;

namespace TaskManagementApp.Api.Services
{
    public class TaskService
    {
        private readonly ApplicationDbContext _context;

        public TaskService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskDto>> GetTasks(int userId)
        {
            return await _context.Tasks
                .Where(t => t.UserId == userId)
                .Include(t => t.Priority)
                .Include(t => t.Category)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    DueTime = t.DueTime,
                    IsCompleted = t.IsCompleted,
                    PriorityId = t.PriorityId,
                    PriorityName = t.Priority.Name,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Reminder = t.Reminder,
                    Repeat = t.Repeat,
                    Order = t.Order
                })
                .OrderBy(t => t.Order)
                .ToListAsync();
        }

        public async Task<TaskDto> GetTaskById(int id, int userId)
        {
            return await _context.Tasks
                .Where(t => t.Id == id && t.UserId == userId)
                .Include(t => t.Priority)
                .Include(t => t.Category)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    DueTime = t.DueTime,
                    IsCompleted = t.IsCompleted,
                    PriorityId = t.PriorityId,
                    PriorityName = t.Priority.Name,
                    CategoryId = t.CategoryId,
                    CategoryName = t.Category.Name,
                    Reminder = t.Reminder,
                    Repeat = t.Repeat,
                    Order = t.Order
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TaskDto> CreateTask(CreateTaskDto dto, int userId)
        {
            // Validate Priority
            var priority = await _context.Priorities.FirstOrDefaultAsync(p => p.Id == dto.PriorityId);
            if (priority == null)
                throw new ArgumentException($"Priority with ID {dto.PriorityId} does not exist.");

            // Validate Category
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == dto.CategoryId);
            if (category == null)
                throw new ArgumentException($"Category with ID {dto.CategoryId} does not exist.");

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                DueTime = dto.DueTime,
                IsCompleted = dto.IsCompleted,
                PriorityId = dto.PriorityId,
                CategoryId = dto.CategoryId,
                Reminder = dto.Reminder,
                Repeat = dto.Repeat,
                Order = dto.Order,
                UserId = userId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                DueTime = task.DueTime,
                IsCompleted = task.IsCompleted,
                PriorityId = task.PriorityId,
                PriorityName = priority.Name,
                CategoryId = task.CategoryId,
                CategoryName = category.Name,
                Reminder = task.Reminder,
                Repeat = task.Repeat,
                Order = task.Order
            };
        }

        public async Task<TaskDto> UpdateTask(TaskDto taskDto, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskDto.Id && t.UserId == userId);
            if (task == null) return null;

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.DueDate = taskDto.DueDate;
            task.DueTime = taskDto.DueTime;
            task.IsCompleted = taskDto.IsCompleted;
            task.PriorityId = taskDto.PriorityId;
            task.CategoryId = taskDto.CategoryId;
            task.Reminder = taskDto.Reminder;
            task.Repeat = taskDto.Repeat;
            task.Order = taskDto.Order;

            await _context.SaveChangesAsync();
            return taskDto;
        }

        public async Task<bool> DeleteTask(int id, int userId)
        {
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task UpdateTaskOrder(List<TaskDto> tasks, int userId)
        {
            foreach (var taskDto in tasks)
            {
                var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == taskDto.Id && t.UserId == userId);
                if (task != null)
                {
                    task.Order = taskDto.Order;
                }
            }
            await _context.SaveChangesAsync();
        }
    }
}
