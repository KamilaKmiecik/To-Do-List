import React, { useState, useEffect } from 'react';
import './App.css';
//import 'antd/dist/antd.css'; // Importuje arkusz stylów Ant Design - działało bez, nie jestem pewna dlaczego 
import { Typography } from 'antd'; // Importuje komponent Typography z Ant Design


//*** PRZEPISANE NA TYPESCRIPT
//import TaskForm from './components/TaskForm.js';
import TaskForm from './components/TaskForm.tsx';
//import TaskColumns from './components/TaskColumns.js';
import TaskColumns from './components/TaskColumns.tsx';
//import TotalCompleted from './components/TotalCompleted.js';
import TotalCompleted from './components/TotalCompleted.tsx';

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

    const intervalId = setInterval(resetDailyTasks, 60000); 

    return () => {
      clearInterval(intervalId);
    };
  }, [tasks]);

  const dailyTasks = tasks.filter(task => task.category === 'Dzienne');
  const oneTimeTasks = tasks.filter(task => task.category === 'Jednorazowe');
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="App">
      <Typography.Title level={1}>To Do List</Typography.Title> {/*Title z Ant Design */}
      <TaskForm
        taskInput={taskInput}
        setTaskInput={setTaskInput}
        category={category}
        setCategory={setCategory}
        isImportant={isImportant}
        toggleImportance={toggleImportance}
        addTask={addTask}
      />
      <TaskColumns
        dailyTasks={dailyTasks}
        oneTimeTasks={oneTimeTasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
      <TotalCompleted completedTasks={completedTasks} />
    </div>
  );
}

export default App;
