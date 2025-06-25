using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagementApp.Api.DTOs;
using TaskManagementApp.Api.Services;

namespace TaskManagementApp.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        private int GetUserId()
        {
            var claimValue = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (int.TryParse(claimValue, out int userId))
                return userId;
            throw new UnauthorizedAccessException("Invalid user ID claim.");
        }


        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetTasks()
        {
            return await _taskService.GetTasks(GetUserId());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _taskService.GetTaskById(id, GetUserId());
            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask([FromBody] CreateTaskDto taskDto)
        {
            try
            {
                var task = await _taskService.CreateTask(taskDto, GetUserId());
                return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                Console.WriteLine("🚨 Task Creation Error: " + ex.Message);
                Console.WriteLine("StackTrace: " + ex.StackTrace);
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto taskDto)
        {
            if (id != taskDto.Id) return BadRequest();
            var result = await _taskService.UpdateTask(taskDto, GetUserId());
            if (result == null) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTask(id, GetUserId());
            if (!result) return NotFound();
            return NoContent();
        }

        [HttpPut("reorder")]
        public async Task<IActionResult> ReorderTasks([FromBody] List<TaskDto> tasks)
        {
            await _taskService.UpdateTaskOrder(tasks, GetUserId());
            return NoContent();
        }
    }
}
