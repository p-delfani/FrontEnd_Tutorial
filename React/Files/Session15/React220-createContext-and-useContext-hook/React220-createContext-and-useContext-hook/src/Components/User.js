import React, { useContext } from "react";
import SubUser from "./SubUser";

import { UsernameContext } from './../Contexts/UsernameContext'

function User() {

  const username = useContext(UsernameContext)

  console.log(username);

  return (
    <div>
      <h2>User: {'Test'}</h2>
      <SubUser />
    </div>
  );
}

export default User;
