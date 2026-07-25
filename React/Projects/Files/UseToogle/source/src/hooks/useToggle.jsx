import { useState } from "react";

const useToggle = (value) => {
  const [state, setState] = useState(value);

  const toggle = () => {
    setState(!state);
  };

  return [state, toggle];
};

export default useToggle;
