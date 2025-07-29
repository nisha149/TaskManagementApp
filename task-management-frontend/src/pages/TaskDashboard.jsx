import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { getTasks, updateTaskOrder } from '../services/api';
import ParticlesBackground from '../components/ParticlesBackground';

function TaskDashboard() {
  const [allTasks, setAllTasks] = useState([]); // raw list
  const [tasks, setTasks] = useState([]);       // filtered + sorted
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [sortOption, setSortOption] = useState('manual');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [reminderTask, setReminderTask] = useState(null); // ⭐ Popup task

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (allTasks.length > 0) {
      sortAndSetTasks(allTasks);
    }
  }, [sortOption, categoryFilter]);

  // 🔔 Check for due reminders every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000);
    return () => clearInterval(interval);
  }, [allTasks]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setAllTasks(response.data);
      sortAndSetTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const sortAndSetTasks = (taskList) => {
    if (!taskList || taskList.length === 0) return;

    let filteredTasks = [...taskList];

    // ⭐ Filter by category
    if (categoryFilter !== 'All') {
      filteredTasks = filteredTasks.filter(task => {
        const category = task.category || task.categoryName || '';
        return category.toLowerCase() === categoryFilter.toLowerCase();
      });
    }

    // ⭐ Sort
    switch (sortOption) {
      case 'dueDate':
        filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'alphabetical':
        filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'latestTop':
        filteredTasks.sort((a, b) => b.id - a.id);
        break;
      case 'latestBottom':
        filteredTasks.sort((a, b) => a.id - b.id);
        break;
      default:
        filteredTasks.sort((a, b) => a.order - b.order);
        break;
    }

    setTasks(filteredTasks);
  };

  // 🔔 Reminder Logic
  const checkReminders = () => {
    const now = new Date();
    const in5Min = new Date(now.getTime() + 5 * 60000);

    const upcoming = allTasks.find(task => {
      if (!task.dueDate || !task.dueTime || task.isCompleted) return false;
      const due = new Date(`${task.dueDate}T${task.dueTime}`);
      return due >= now && due <= in5Min;
    });

    if (upcoming) {
      setReminderTask(upcoming);
      const audio = new Audio('/sounds/ding.mp3');
      audio.play();
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = [...tasks];
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    const updated = reordered.map((task, index) => ({ ...task, order: index }));
    setTasks(updated);

    try {
      await updateTaskOrder(updated);
    } catch (err) {
      console.error('Failed to update task order:', err);
    }
  };

  return (
    <div className="relative min-h-screen flex bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setSortOption={setSortOption}
        fetchTasks={fetchTasks}
        setCategoryFilter={setCategoryFilter}
      />

      <div className="relative z-10 flex-1 px-6 pt-16 pb-6">
        <button
          className="fixed top-4 left-4 text-primary text-2xl"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <TaskList tasks={tasks} setTasks={setTasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          className="fixed bottom-5 right-6 p-6 rounded-full shadow-lg"
          style={{ backgroundColor: '#52489f', color: '#000000' }}
          onClick={() => setIsAddTaskOpen(true)}
        >
          +
        </button>

        {isAddTaskOpen && (
          <AddTaskForm setIsOpen={setIsAddTaskOpen} fetchTasks={fetchTasks} />
        )}

        {/* 🔔 Reminder Popup */}
        {reminderTask && (
          <div className="fixed bottom-6 right-6 bg-white border border-purple-400 shadow-xl rounded-lg p-4 z-50 max-w-sm animate-bounce">
            <h3 className="text-lg font-bold text-purple-600">⏰ Reminder</h3>
            <p className="font-semibold">{reminderTask.title}</p>
            {reminderTask.description && (
              <p className="text-sm text-gray-600">{reminderTask.description}</p>
            )}
            <button
              onClick={() => setReminderTask(null)}
              className="mt-2 text-purple-600 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskDashboard;
