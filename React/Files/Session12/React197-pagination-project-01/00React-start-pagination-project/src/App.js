import React, { useEffect, useState } from 'react'

export default function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(datas => {
        setTodos(datas)
      })
  }, [])


  return (
    <div>
      {
        !todos ? "Loading" : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {todos.map(todo => (
                <tr>
                  <td>{todo.id}</td>
                  <td>{todo.userId}</td>
                  <td>{todo.title}</td>
                  <td>
                    <p
                      className={todo.completed ? "btn btn-success" : 'btn btn-danger'}
                    >
                      {todo.completed ? 'Completed' : 'Pending'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}
