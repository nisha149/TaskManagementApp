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

  const handleToggleComplete = async () => {
    try {
      const updatedTask = { ...task, isCompleted: !isCompleted };
      await updateTask(task.id, updatedTask);
      setIsCompleted(!isCompleted);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? updatedTask : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error(err);
    }
  };

  const priorityStyles = {
    High: 'bg-red-100 text-red-700 border-red-300',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    Low: 'bg-green-100 text-green-700 border-green-300',
  };

  const formatDateTime = (date, time) => {
    if (!date) return '';
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return `${formattedDate}${time ? ` at ${time}` : ''}`;
  };

  return (
    <div className="relative bg-white/30 backdrop-blur-xl border border-white/25 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 overflow-hidden group">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h3
              className={`text-lg font-semibold leading-tight ${
                isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {isCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-700">{task.description}</p>
          )}

          {/* Meta info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-800">
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <span className="font-medium">
                  {formatDateTime(task.dueDate, task.dueTime)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <FaFlag className="text-orange-500" />
              <span
                className={`px-2 py-0.5 text-xs rounded-full border font-semibold ${
                  priorityStyles[task.priorityName] ||
                  'bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                {task.priorityName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FaTag className="text-purple-600" />
              <span className="text-sm font-medium">{task.categoryName}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleToggleComplete}
            title="Toggle Complete"
            className="p-2 rounded-full hover:bg-green-100 transition text-green-700"
          >
            {isCompleted ? <FaCheckCircle size={18} /> : <FaRegCircle size={18} />}
          </button>
          <button
            onClick={handleDelete}
            title="Delete Task"
            className="p-2 rounded-full hover:bg-red-100 transition text-red-600"
          >
            <FaTrashAlt size={16} />
          </button>
        </div>
      </div>

      {/* Decorative Blur Accent */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-300 opacity-10 rounded-full blur-3xl pointer-events-none group-hover:opacity-20 transition-all duration-500"></div>
    </div>
  );
}

export default TaskCard;



