import { useState, useEffect } from 'react'
import useLocalStorage from './hooks/useLocalStorage';
function App() {

  const [value, setValue] = useLocalStorage('sabzlearn-value', '')

  return (
    <div className="App">
      <input type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default App;
