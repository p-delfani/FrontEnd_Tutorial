import React, { useState } from "react";
import User from "./Components/User";

function App() {
  const [username, setUserName] = useState("Mohammad Amin");

  return (
    <div>
      <User username={username} />
    </div>
  );
}

export default App;
