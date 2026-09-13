import React, { useState } from 'react'

function EditTodoFotm({editTodo, task}) {

    const [value , setValue] = useState("");
    const handleSubmit = e =>{
        e.preventDefault();

        editTodo(value , task.id);
        setValue("");
    }
  return (

    <form className='TodoForm' onSubmit={handleSubmit}>
        <input type="text" className='todo-input' value={value}
         placeholder='Update Task' onChange={(e) => setValue(e.target.value)} />
         <button type='submit' className='todo-btn'>Update Task</button>
    </form> 
  )
}

export default EditTodoFotm
