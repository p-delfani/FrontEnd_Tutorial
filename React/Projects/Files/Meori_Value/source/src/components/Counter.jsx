import { memo } from "react";

const Counter = ({ count, setCount }) => {
  console.log(`[Counter.jsx] Re-Rendered`);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};

export default memo(Counter);
