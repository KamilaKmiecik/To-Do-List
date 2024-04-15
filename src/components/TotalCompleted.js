import React from 'react';

const TotalCompleted = ({ completedTasks }) => {
  return (
    <div className="total-completed">
      <h2>Zrobione Zadania</h2>
      <p>{completedTasks.length}</p>
    </div>
  );
};

export default TotalCompleted;
