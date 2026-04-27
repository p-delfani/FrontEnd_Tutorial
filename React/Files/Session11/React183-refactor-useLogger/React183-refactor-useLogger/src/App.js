import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import useUpdateLogger from './hooks/useUpdateLogger';
import './App.css';

function App() {

  const [value, setValue] = useUpdateLogger('')
  

  return (
    <div className="App">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

export default App;
