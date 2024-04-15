import React from 'react';

const TaskForm = ({ taskInput, setTaskInput, category, setCategory, isImportant, toggleImportance, addTask }) => {
  return (
    <div className="add-task">
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Wpisz zadanie..."
      />
      <select onChange={(e) => setCategory(e.target.value)}>
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
