import React, { useState } from 'react'

export default function App() {

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([
    { id: 1, name: 'Amin', age: '12' },
    { id: 2, name: 'Amir', age: '13' },
    { id: 3, name: 'MMD', age: '98' },
    { id: 4, name: 'BABAK', age: '17' },
  ])

  const minusCount = () => {
    setCount(prevState => {
      return prevState - 1
    })
  }

  const plusCount = () => {
    setCount(prevState => {
      return prevState + 1
    })
  }

  const removeUser = (userID) => {

    setUsers(prevState => {
      let newUsers = prevState.filter(user => {
        return user.id !== userID
      })
      return newUsers
    })

  }

  return (
    <div>
      <button onClick={minusCount}>-</button>
      <h1>{count}</h1>
      <button onClick={plusCount}>+</button>
      <hr />
      <ul>

        {users.map(user => (
          <li>{user.name}<button onClick={() => removeUser(user.id)}>Remove</button></li>
        ))}

      </ul>
    </div>
  )
}
