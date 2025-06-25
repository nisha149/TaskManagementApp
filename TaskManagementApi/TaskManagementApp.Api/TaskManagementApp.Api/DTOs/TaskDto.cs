namespace TaskManagementApp.Api.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public TimeSpan? DueTime { get; set; }
        public bool IsCompleted { get; set; }
        public int PriorityId { get; set; }
        public string PriorityName { get; set; }   
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }   
        public string Reminder { get; set; }
        public string Repeat { get; set; }
        public int Order { get; set; }
    }
}
