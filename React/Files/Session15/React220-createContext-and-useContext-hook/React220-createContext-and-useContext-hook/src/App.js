import React, { useState } from "react";
import User from "./Components/User";

import { UsernameContext } from "./Contexts/UsernameContext";

function App() {
  const [username, setUserName] = useState("Mohammad Amin");

  console.log(UsernameContext);

  return (
    <UsernameContext.Provider value={username}>
      <div>
        <User />
      </div>
    </UsernameContext.Provider>
  );
}

export default App;
