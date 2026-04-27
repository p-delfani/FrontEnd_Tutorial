import React, { useState, memo, useCallback } from "react";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");

  console.log("App Run");

  const addCounter = useCallback(() => {
    setCounter((prevCount) => prevCount + 1);
  }, [counter]);

  const minusCounter = useCallback(() => {
    setCounter((prevCount) => prevCount - 1);
  }, [counter]);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Title title={title} />
      <h3>{counter}</h3>
      <Buttons add={addCounter} minus={minusCounter} />
    </div>
  );
}

const Title = memo(({ title }) => {
  console.log("Title Run");
  return <h3>{title}</h3>;
});

const Buttons = memo(({ add, minus }) => {
  console.log("Buttons Run");
  return (
    <>
      <button onClick={add}>Add</button>
      <button onClick={minus}>Minus</button>
    </>
  );
});
