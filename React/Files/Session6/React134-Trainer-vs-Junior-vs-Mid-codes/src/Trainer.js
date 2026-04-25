import React, { useState } from 'react'

export default function Trainer() {

    let [count, setCount] = useState(0)

    function minusCount() {
        count = count - 1
        console.log(count)
    }

    function plusCount() {
        count = count + 1
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
