import React, { useId } from "react";

export default function App() {

  const usernameID = useId()
  const passwordID = useId()

  console.log('UserName ID:', usernameID);
  console.log('Password ID:', passwordID);

  return (
    <div>
      <form action="#">
        <label htmlFor={usernameID + '-value'}>Your Username: </label>
        <input type="text" id={usernameID + 'value'} placeholder="Username" />
        <hr />
        <label htmlFor={passwordID + '-value'}>Password: </label>
        <input type="text" id={passwordID + '-value'} placeholder="Password" />
      </form>
    </div>
  );
}
