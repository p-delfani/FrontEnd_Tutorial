import React, { useState, useEffect } from 'react'
import User from './components/User';

export default function App() {

    const [users, setUsers] = useState([
        {id: 1, name: 'Amin'},
        {id: 2, name: 'Amir'},
        {id: 3, name: 'Ali'},
        {id: 4, name: 'Mohammad'},
    ])
    const [count, setCount] = useState(0)

    // useEffect(() => {
    //     console.log('component mount'); // Mount - Updating
    // })


    useEffect(() => {
        console.log('App.js => component mount'); // Mount
    }, [])


    useEffect(() => {
        console.log('App.js => component update :('); // Updating
    }, [count])


    const removeHandler = (userID) => {
        setUsers(prevUsers => {
            let newUsers = prevUsers.filter(user => user.id !== userID)
            return newUsers
        })
    }
  

    return (
        <div>
            <ul>
                {users.map(user => (
                    <User {...user} key={user.id} onRemove={removeHandler} />
                ))}
            </ul>
        </div>
    )
}
