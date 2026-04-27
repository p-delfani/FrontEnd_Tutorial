import React, { useState, useMemo } from 'react'

export default function App() {

  const [firstCount, setFirstCount] = useState(0)
  const [secondCount, setSecondCount] = useState(0)
  const [text, setText] = useState('')

  const firstCounterHandler = () => {

    setFirstCount(prevCount => prevCount + 1)
  }

  const secondCounterHandler = () => {
    setSecondCount(prevCount => prevCount + 1)
  }

  const isEven = useMemo(() => {
    let index = 0
    while (index < 2000000000) {
      index++
    }

    return firstCount % 2 === 0
  }, [firstCount])

  return (
    <div>
      <button onClick={firstCounterHandler}>Add First Counter: {firstCount}</button>
      {isEven ? 'Even' : 'Odd'}
      <br />
      <button onClick={secondCounterHandler}>Add Second Counter: {secondCount}</button>
    </div>
  )
}
