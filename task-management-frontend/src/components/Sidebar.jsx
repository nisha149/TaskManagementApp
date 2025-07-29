import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaSortAlphaDown,
  FaClipboardList,
  FaTrash,
  FaHome,
  FaBell,
  FaFolder
} from 'react-icons/fa';
import { BsInbox } from 'react-icons/bs';
import todoIcon from '../assets/images/todo-icon.png';
import 'react-calendar/dist/Calendar.css';

function Sidebar({ isOpen, setIsOpen, setSortOption, setCategoryFilter }) {
  const [showCal, setShowCal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(() => localStorage.theme === 'dark');
  const [showReminders, setShowReminders] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date & Time' },
    { value: 'manual', label: 'Manual' },
    { value: 'alphabetical', label: 'Alphabetical A-Z' },
    { value: 'latestTop', label: 'Latest at Top' },
    { value: 'latestBottom', label: 'Latest at Bottom' },
  ];

  const categories = [
    { name: 'All', icon: <FaFolder /> },
    { name: 'Work', icon: <FaClipboardList /> },
    { name: 'Personal', icon: <BsInbox /> },
  ];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const onDateChange = (d) => {
    setDate(d);
    setShowCal(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-3/4 sm:w-64 max-w-xs p-6 z-50 shadow-2xl bg-white dark:bg-[#1e1e2f] text-black dark:text-white`}
      >
        {/* Close Button */}
        <button
          className="text-xl font-bold mb-6 hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={todoIcon} alt="To-Do Icon" className="w-10 h-10 mr-3" />
          <h2 className="text-2xl font-extrabold tracking-tight">Task Manager</h2>
        </div>

        {/* Navigation */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-primary">
                <FaHome /> Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setShowCal(true)}
                className="flex items-center gap-2 hover:text-primary"
              >
                <FaCalendarAlt /> Calendar
              </a>
            </li>
          </ul>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button
                  className={`flex items-center gap-2 w-full text-left hover:text-primary ${
                    selectedCategory === cat.name ? 'font-bold text-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setCategoryFilter(cat.name);
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Reminders Toggle */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Reminders</h3>
          <button
            onClick={() => setShowReminders(!showReminders)}
            className="flex items-center gap-2 px-3 py-1 bg-primary text-white rounded hover:bg-[#b25598] transition"
          >
            <FaBell /> {showReminders ? 'Hide' : 'Show'} Reminders
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="mb-8">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-2">
            <FaSortAlphaDown /> Sort By
          </h3>
          <select
            onChange={handleSortChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">📩 Feedback</h3>
          <a
            href="mailto:feedback@taskapp.com"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary"
          >
            Send Feedback
          </a>
        </div>
      </div>

      {/* Calendar Overlay */}
      {showCal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
            <Calendar onChange={onDateChange} value={date} />
            <button
              onClick={() => setShowCal(false)}
              className="mt-4 w-full px-4 py-2 bg-primary text-white rounded hover:bg-[#b25598]"
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
