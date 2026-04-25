import React, { useState } from 'react'

export default function Trainer() {

    const [count, setCount] = useState(0)

    function minusCount() {
        setCount(count - 1)
        setCount(count - 1)
        console.log(count)
    }

    function plusCount() {
        setCount(count + 1)
        setCount(count + 1)
        console.log(count)
    }

    return (
        <div>
            <button onClick={minusCount}>-</button>
            <h1>{count}</h1>
            <button onClick={plusCount}>+</button>
        </div>
    )
}
