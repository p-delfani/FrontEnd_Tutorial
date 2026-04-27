import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useCounter from './hooks/useCounter';

function App() {
  const [count, addCount, minusCount] = useCounter(0)

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={addCount}>Add</button>
      <button onClick={minusCount}>Minus</button>
    </div>
  );
}

export default App;
