import React, { useState } from "react";
import User from "./Components/User";

import UsernameProvider from "./Contexts/UsernameContext";

function App() {

  return (
    <UsernameProvider>
      <div>
        <User />
      </div>
    </UsernameProvider>
  );
}

export default App;
