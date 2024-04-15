import React from 'react';

interface TotalCompletedProps {
    //tablica, w której każdy element może być dowolnego typu
  completedTasks: any[]; 
}

const TotalCompleted: React.FC<TotalCompletedProps> = ({ completedTasks }) => {
  return (
    <div className="total-completed">
      <h2>Zrobione Zadania</h2>
      <p>{completedTasks.length}</p>
    </div>
  );
};

export default TotalCompleted;
