import React, {useState} from 'react'

export default function App() {

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([
    {id: 1, name: 'Mohammad', age: 21},
    {id: 2, name: 'Ali', age: 23},
    {id: 3, name: 'Amin', age: 27},
    {id: 4, name: 'Amir', age: 12},
  ])

  const minusCount = () => {
    setCount(count - 1)
  }
  
  const plusCount = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <button onClick={minusCount}>-</button>
      <h1>{count}</h1>
      <button onClick={plusCount}>+</button>
      <hr />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.age}</li>
        ))}
      </ul>
    </div>
  )
}
