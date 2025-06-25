import { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';

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

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className={`text-lg font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-text'}`}>
          {task.title}
        </h3>
        <p className="text-sm text-gray-600">{task.description}</p>
        {task.dueDate && (
          <p className="text-sm text-gray-600">
            Due: {new Date(task.dueDate).toLocaleDateString()} {task.dueTime}
          </p>
        )}
        <p className="text-sm text-gray-600">Priority: {task.priorityName}</p>
        <p className="text-sm text-gray-600">Category: {task.categoryName}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleToggleComplete}
          className={`p-2 rounded ${isCompleted ? 'bg-success' : 'bg-gray-200'}`}
        >
          {isCompleted ? '✓' : '○'}
        </button>
        <button onClick={handleDelete} className="p-2 rounded bg-red-500 text-white">
          ✕
        </button>
      </div>
    </div>
  );
}

export default TaskCard;