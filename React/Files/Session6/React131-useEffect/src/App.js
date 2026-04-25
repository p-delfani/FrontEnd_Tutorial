import React, { useState, useEffect } from 'react'

export default function App() {

    const [count, setCount] = useState(0)

    // useEffect(() => {
    //     console.log('component mount'); // Mount - Updating
    // })


    useEffect(() => {
        console.log('component mount'); // Mount
    }, [])


    useEffect(() => {
        console.log('component update'); // Updating
    }, [count])


    const minusCount = () => {
        setCount(prevCount => prevCount - 1)
    }

    const plusCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    return (
        <div>
            <button onClick={minusCount}>-</button>
            <h1>{count}</h1>
            <button onClick={plusCount}>+</button>
        </div>
    )
}
