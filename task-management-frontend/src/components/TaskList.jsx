import TaskCard from './TaskCard';
import { Draggable } from '@hello-pangea/dnd';

function TaskList({ tasks, setTasks }) {
  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} setTasks={setTasks} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}

export default TaskList;
