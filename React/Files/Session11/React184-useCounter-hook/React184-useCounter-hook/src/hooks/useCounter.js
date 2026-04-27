import React, { useState } from 'react'

export default function useCounter(init) {
  const [count, setCount] = useState(init)

  const addCount = () => {
    setCount(prevCount => prevCount + 1)
  }

  const minusCount = () => {
    setCount(prevCount => prevCount - 1)
  }

  return [count, addCount, minusCount]
}
