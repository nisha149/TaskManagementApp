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
    console.log("Creating task with:", task); 
  await createTask(task); 
  fetchTasks();
  setIsOpen(false);
} catch (err) {
  console.error("Failed to create task:", err);
}
};


  const handleDateSelect = (option) => {
    const date = new Date();
    if (option === 'today') {
      setDueDate(date.toISOString().split('T')[0]);
    } else if (option === 'tomorrow') {
      date.setDate(date.getDate() + 1);
      setDueDate(date.toISOString().split('T')[0]);
    } else if (option === '3days') {
      date.setDate(date.getDate() + 3);
      setDueDate(date.toISOString().split('T')[0]);
    } else if (option === 'sunday') {
      const day = date.getDay();
      const daysUntilSunday = (7 - day) % 7;
      date.setDate(date.getDate() + daysUntilSunday);
      setDueDate(date.toISOString().split('T')[0]);
    } else {
      setDueDate('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-30">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
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
                  className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Reminder */}
          <div>
            <label className="block text-gray-700 mb-1">Reminder</label>
            <input
              type="text"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., 30 minutes before"
            />
          </div>

          {/* Repeat */}
          <div>
            <label className="block text-gray-700 mb-1">Repeat</label>
            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-gray-700 mb-1">Priority</label>
            <select
              value={priorityId}
              onChange={(e) => setPriorityId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={1}>Personal</option>
              <option value={2}>Work</option>
              <option value={3}>Others</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskForm;
