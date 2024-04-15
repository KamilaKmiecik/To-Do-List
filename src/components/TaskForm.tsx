import React, { ChangeEvent } from 'react';

interface TaskFormProps {
  taskInput: string;
  setTaskInput: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isImportant: boolean;
  toggleImportance: () => void;
  addTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskInput, setTaskInput, category, setCategory, isImportant, toggleImportance, addTask }) => {
  const handleTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="add-task">
      <input
        type="text"
        value={taskInput}
        onChange={handleTaskInputChange}
        placeholder="Wpisz zadanie..."
      />
      <select onChange={handleCategoryChange}>
        <option value="Dzienne">Dzienne</option>
        <option value="Jednorazowe">Jednorazowe</option>
      </select>
      <button onClick={toggleImportance} className={isImportant ? 'important' : ''}>
        {isImportant ? 'Ważne' : 'Zwykłe'}
      </button>
      <button onClick={addTask}>Dodaj Zadanie</button>
    </div>
  );
};

export default TaskForm;
