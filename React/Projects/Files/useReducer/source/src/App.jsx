import { useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "increase": {
      return state + 1;
    }

    case "decrease": {
      return state - 1;
    }

    case "reset": {
      return 0;
    }

    default: {
      return state;
    }
  }
};

function App() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Couter in {count}</h1>
      <div className="card">
        <button
          onClick={() => dispatch({ type: "increase" })}
          style={{ margin: "10px" }}
        >
          Increase
        </button>
        <button onClick={() => dispatch({ type: "decrease" })}>Decrease</button>
        <br />
        <br />
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
