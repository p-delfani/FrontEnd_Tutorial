import { useState } from "react";

const useCounter = (value) => {
  const [count, setCount] = useState(value);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return { count, increase, decrease };
};

export default useCounter;
