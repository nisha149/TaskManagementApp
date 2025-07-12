// File: DTOs/CreateTaskDto.cs
namespace TaskManagementApp.Api.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public TimeSpan? DueTime { get; set; }
        public bool IsCompleted { get; set; }
        public int PriorityId { get; set; }
        public int CategoryId { get; set; }
        public string Reminder { get; set; }
        public string Repeat { get; set; }
        public int Order { get; set; }
    }
}
