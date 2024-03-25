import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('Dzienne');
  const [taskInput, setTaskInput] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Math.random(),
        text: taskInput,
        category: category,
        completed: false,
        important: isImportant,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setIsImportant(false);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const toggleImportance = () => {
    setIsImportant(!isImportant);
  };

  const countCompletedTasks = (taskList) => {
    return taskList.reduce((total, task) => task.completed ? total + 1 : total, 0);
  };

  useEffect(() => {
    const resetDailyTasks = () => {
      const currentTime = new Date();
      const resetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 0); // Północ następnego dnia
      const timeUntilReset = resetTime - currentTime;
      
      setTimeout(() => {
        setTasks(tasks.map(task => task.category === 'Dzienne' ? {...task, completed: false} : task));
      }, timeUntilReset);
    };

    const intervalId = setInterval(resetDailyTasks, 60000); // Sprawdzanie co minutę

    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  const dailyTasks = tasks.filter(task => task.category === 'Dzienne');
  const oneTimeTasks = tasks.filter(task => task.category === 'Jednorazowe');
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="App">
      <h1>ToDo</h1>
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
      <div className="task-columns">
        <div className="task-column">
          <h2>Codzienne</h2>
            <p className="completed-count">Zrobione: {countCompletedTasks(dailyTasks)}</p>
          <div className="tasks">
            {dailyTasks.map(task => (
              <div key={task.id} className={`task ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`}>
                <span>{task.text}</span>
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <button onClick={() => deleteTask(task.id)}>Usuń</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="task-column">
          <h2>Jednorazowe</h2>
          <p className="completed-count">Zrobione: {countCompletedTasks(oneTimeTasks)}</p>
          <div className="tasks">
            {oneTimeTasks.map(task => (
              <div key={task.id} className={`task ${task.completed ? 'completed' : ''} ${task.important ? 'important' : ''}`}>
                <span>{task.text}</span>
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <button onClick={() => deleteTask(task.id)}>Usuń</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="total-completed">
        <h2>Zrobione Zadania</h2>
        <p>{completedTasks.length}</p>
      </div>
    </div>
  );
}

export default App;