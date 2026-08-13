import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Name from "./components/Name";
import Counter from "./components/Counter";
import Users from "./components/Users";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
  ]);

  const changeUser = () => {
    const newUsers = [...users];
    newUsers[1] = "Amin";
    setUsers(newUsers);
  };

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
      <h1>Vite + React</h1>
      <div className="card">
        <Counter count={count} setCount={setCount} />

        <Name name={name} setName={setName} />

        <Users users={users} />

        <button onClick={changeUser}>Change First User</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
