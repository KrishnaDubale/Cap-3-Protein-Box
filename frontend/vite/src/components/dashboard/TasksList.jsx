import { useState } from 'react';

const TasksList = ({ initialTasks = [] }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  return (
    <div className="tasks-section">
      <h3 className="section-title">Upcoming Tasks</h3>
      <div className="tasks-list">
        {tasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            color: '#8C2F39',
            opacity: 0.7 
          }}>
            No tasks yet. Start planning your event!
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksList;

