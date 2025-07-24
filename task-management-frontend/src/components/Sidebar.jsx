import { useState } from 'react';
import Calendar from 'react-calendar';
import todoIcon from '../assets/images/todo-icon.png';
import 'react-calendar/dist/Calendar.css';

function Sidebar({ isOpen, setIsOpen, setSortOption, fetchTasks }) {
  const [showCal, setShowCal] = useState(false);
  const [date, setDate] = useState(new Date());

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

  const openCalendar = () => setShowCal(true);
  const closeCalendar = () => setShowCal(false);

  const onDateChange = (d) => {
    setDate(d);
    closeCalendar();
    // Optionally fetch tasks for selected date: fetchTasks();
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full bg-[#6d5192] text-white transition-transform transform ${
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
            className="w-full p-2 mt-2 border rounded text-gray-300 focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <h3 className="text-white font-semibold text-lg">Calendar</h3>
          <button
            onClick={openCalendar}
            className="px-3 py-1 bg-gray-300 text-[#52489f] rounded-md hover:bg-gray-100"
          >
            📅 Show Date
          </button>
        </div>

 <div className="mb-8">
          <span className="text-white text-lg">📩Feedback</span>
          <div>
          <a
            href="mailto:feedback@taskapp.com"
            className="text-gray-300 hover:text-gray-200 transition-colors no-underline"

          >
            Send Feedback
          </a>
          </div>
        </div>
      </div>    


      {/* Calendar overlay */}
      {showCal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <Calendar onChange={onDateChange} value={date} />
            <button
              onClick={closeCalendar}
              className="mt-4 px-4 py-2 bg-[#52489f] text-gray-200 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
