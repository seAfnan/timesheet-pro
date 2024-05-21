import React from "react";

interface TaskHourListProps {
  tasks: Array<{
    projectName: string;
    isProject: boolean;
    taskList: string[];
    hours: number[];
  }>;
  onRemove: (index: number) => void;
}

const TaskHourList: React.FC<TaskHourListProps> = ({ tasks, onRemove }) => {
  const handleRemove = (index: number) => {
    onRemove(index);
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <h3>
            {task.isProject ? "Project" : "Non-Project"}: {task.projectName}
          </h3>
          <ul>
            {task.taskList.map((taskName, i) => (
              <li key={i}>{taskName}</li>
            ))}
          </ul>
          <ul>
            {task.hours.map((hour, i) => (
              <li key={i}>{hour} hours</li>
            ))}
          </ul>
          <button onClick={() => handleRemove(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TaskHourList;
