import { useState } from 'react';
import { createTask } from '../services/api';

function AddTaskForm({ setIsOpen, fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priorityId, setPriorityId] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [reminder, setReminder] = useState('');
  const [repeat, setRepeat] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const task = {
        title,
        description,
        dueDate: dueDate || null,
        dueTime: dueTime ? `${dueTime}:00` : null,
        isCompleted: false,
        priorityId,
        categoryId,
        reminder,
        repeat,
        order: 0,
      };
      await createTask(task);
      fetchTasks();
      setIsOpen(false);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleDateSelect = (option) => {
    const date = new Date();
    switch (option) {
      case 'tomorrow':
        date.setDate(date.getDate() + 1);
        break;
      case '3days':
        date.setDate(date.getDate() + 3);
        break;
      case 'sunday': {
        const day = date.getDay();
        const daysUntilSunday = (7 - day) % 7;
        date.setDate(date.getDate() + daysUntilSunday);
        break;
      }
      case 'noDate':
        setDueDate('');
        return;
      default:
        break;
    }
    setDueDate(date.toISOString().split('T')[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto py-8">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Task</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Task title"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short description..."
              rows="3"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { label: 'No Date', value: 'noDate' },
                { label: 'Today', value: 'today' },
                { label: 'Tomorrow', value: 'tomorrow' },
                { label: '3 Days Later', value: '3days' },
                { label: 'This Sunday', value: 'sunday' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleDateSelect(value)}
                  className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Reminder */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Reminder</label>
            <input
              type="text"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              placeholder="e.g., 30 minutes before"
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Repeat */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Repeat</label>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            >
              <option value="">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              value={priorityId}
              onChange={(e) => setPriorityId(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="mt-1 w-full px-4 py-2 border rounded-lg"
            >
              <option value={1}>Personal</option>
              <option value={2}>Work</option>
              <option value={3}>Others</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
