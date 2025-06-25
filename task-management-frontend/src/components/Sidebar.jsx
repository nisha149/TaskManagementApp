import { useState } from 'react';
import todoIcon from '../assets/images/todo-icon.png';

function Sidebar({ isOpen, setIsOpen, setSortOption, fetchTasks }) {
  const sortOptions = [
    { value: 'dueDate', label: 'Due Date & Time' },
    { value: 'manual', label: 'Manual' },
    { value: 'alphabetical', label: 'Alphabetical A-Z' },
    { value: 'latestTop', label: 'Latest at Top' },
    { value: 'latestBottom', label: 'Latest at Bottom' },
  ];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    fetchTasks();
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#52489f] text-white transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-2/3 sm:w-1/2 max-w-xs p-6 z-50 shadow-xl`}
    >
      <button
        className="text-white text-2xl font-bold mb-6 hover:text-gray-200 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </button>
      <div className="flex items-center mb-8">
        <img src={todoIcon} alt="To-Do Icon" className="w-10 h-10 mr-3" />
        <h2 className="text-2xl font-extrabold">To-Do List</h2>
      </div>
      <div className="mb-8">
        <h3 className="text-white font-semibold text-lg">Sort By</h3>
        <select
          onChange={handleSortChange}
          className="w-full p-2 mt-2 border rounded text-black focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <h3 className="text-white font-semibold text-lg">Feedback</h3>
        <a
          href="mailto:feedback@taskapp.com"
          className="underline hover:text-gray-200 transition-colors"
        >
          Send Feedback
        </a>
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg mb-2">Calendar</h3>
        <div className="text-white opacity-80">📅 Calendar Placeholder</div>
      </div>
    </div>
  );
}

export default Sidebar;
