import React, { useState, useEffect } from 'react'

export default function Trainer() {

    const [count, setCount] = useState(0)

    function minusCount() {
        setCount(prevCount => prevCount - 1)
        setCount(prevCount => prevCount - 1)
    }

    function plusCount() {
        setCount(prevCount => prevCount + 1)
        setCount(prevCount => prevCount + 1)
    }

    useEffect(() => {
        console.log(count);
    }, [count])

    return (
        <div>
            <button onClick={minusCount}>-</button>
            <h1>{count}</h1>
            <button onClick={plusCount}>+</button>
        </div>
    )
}
