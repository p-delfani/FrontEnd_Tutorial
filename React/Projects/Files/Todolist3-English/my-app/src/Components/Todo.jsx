
import React from 'react';

const Todo = ({task ,toggleComplete,deleteTodo,editTodo }) => {
  return (
    <div className="Todo">
      <p onClick={()=> toggleComplete(task.id)} 
      className={`${task.completed ? 'completed' : ""}`}> {task.task}</p>

      <div>
        <p onClick={() => editTodo(task.id)}>Edit</p>
        <p onClick={()=> deleteTodo(task.id)}>Delete</p>
      </div>
    </div>
  );
};

export default Todo;

