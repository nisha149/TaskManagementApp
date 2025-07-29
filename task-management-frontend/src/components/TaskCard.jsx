import { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';
import {
  FaCheckCircle,
  FaRegCircle,
  FaTrashAlt,
  FaCalendarAlt,
  FaFlag,
  FaTag,
} from 'react-icons/fa';

function TaskCard({ task, setTasks }) {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggleComplete = async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };
      await updateTask(task.id, updatedTask);
      setIsCompleted(!isCompleted);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error(err);
    }
  };

  const formatDateTime = (date, time) => {
    if (!date) return '';
    const d = new Date(date);
    const formatted = d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return `${formatted}${time ? ` at ${time}` : ''}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-[#70708e] text-gray-800 dark:text-white border border-gray-500 dark:border-gray-700 rounded-xl p-5 mb-4 shadow-md hover:shadow-lg transition-all duration-300 flex justify-between items-start gap-4">

      {/* Left Section */}
      <div className="flex-1 space-y-3">
        {/* Title & Status */}
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-bold ${isCompleted ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${
              isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-400 dark:text-gray-200">{task.description}</p>
        )}

        {/* Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-200 mt-1">
            <FaCalendarAlt className="text-blue-600" />
            {formatDateTime(task.dueDate, task.dueTime)}
          </div>
        )}

        {/* Category and Priority as Button Tags */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {(task.category || task.categoryName) && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              <FaTag className="text-sm" /> {task.category || task.categoryName}
            </span>
          )}
          {task.priorityName && (
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${getPriorityColor(task.priorityName)}`}>
              <FaFlag className="text-sm" /> {task.priorityName}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleToggleComplete}
          title="Mark Complete"
          className="p-2 text-green-400 hover:bg-green-100 rounded-full"
        >
          {isCompleted ? <FaCheckCircle size={18} /> : <FaRegCircle size={18} />}
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          title="Delete Task"
          className="p-2 text-red-300 hover:bg-red-100 rounded-full"
        >
          <FaTrashAlt size={16} />
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {showConfirm && (
        <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 border dark:border-gray-600 p-4 rounded-lg shadow-lg z-50">
          <p className="text-sm font-medium mb-3">Are you sure you want to delete this task?</p>
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-400 text-white text-sm rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 border border-gray-400 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
