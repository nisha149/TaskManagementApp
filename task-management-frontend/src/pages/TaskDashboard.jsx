import { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import { getTasks, updateTaskOrder } from '../services/api';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [sortOption, setSortOption] = useState('manual');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      sortAndSetTasks(tasks);
    }
  }, [sortOption]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      sortAndSetTasks(response.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const sortAndSetTasks = (taskList) => {
    if (!taskList || taskList.length === 0) return;

    let sortedTasks = [...taskList];

    switch (sortOption) {
      case 'dueDate':
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'alphabetical':
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'latestTop':
        sortedTasks.sort((a, b) => b.id - a.id);
        break;
      case 'latestBottom':
        sortedTasks.sort((a, b) => a.id - b.id);
        break;
      default:
        sortedTasks.sort((a, b) => a.order - b.order);
        break;
    }

    setTasks(sortedTasks);
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
    <div className="min-h-screen bg-secondary flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setSortOption={setSortOption}
        fetchTasks={fetchTasks}
      />
      <div className="flex-1 p-6">
        <button
          className="fixed top-4 left-4 text-primary text-2xl"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

  <DragDropContext onDragEnd={handleDragEnd}>
  <Droppable
    droppableId="tasks"
    isDropDisabled={false}
    isCombineEnabled={false}
    ignoreContainerClipping={false} 
  >
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        <TaskList tasks={tasks} setTasks={setTasks} />
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>


        <button
          className="fixed bottom-4 right-4 bg-accent text-white p-4 rounded-full shadow-lg"
          onClick={() => setIsAddTaskOpen(true)}
        >
          +
        </button>

        {isAddTaskOpen && (
          <AddTaskForm setIsOpen={setIsAddTaskOpen} fetchTasks={fetchTasks} />
        )}
      </div>
    </div>
  );
}

export default TaskDashboard;

