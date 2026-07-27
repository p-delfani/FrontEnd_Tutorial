import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);

    return value ? value : defaultValue;
  });

  const setValue = (value) => {
    setState(value);
    localStorage.setItem(key, value);
  };

  return [state, setValue];
};

export default useLocalStorage;
