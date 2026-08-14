import { memo, useState, useMemo } from "react";

const expensiveFunction = (exNumber) => {
  console.log(`[expensiveFunction] Calculating ...`);

  for (let i = 0; i < 1000000000; i++) {
    exNumber += 1;
  }

  return exNumber;
};

const Expensive = ({ count }) => {
  const [exNumber, setExNumber] = useState(5);

  console.log(`[Expensive.jsx] Re-Rendered`);

  const result = useMemo(() => expensiveFunction(exNumber), [exNumber]);

  return (
    <>
      <div>Count: {count}</div>
      <div>Expensive Result: {result}</div>
    </>
  );
};

export default memo(Expensive);
