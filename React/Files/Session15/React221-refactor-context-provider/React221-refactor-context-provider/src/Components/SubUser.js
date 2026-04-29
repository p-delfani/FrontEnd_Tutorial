import React, { useContext } from "react";
import SubSubUser from "./SubSubUser";

import { UsernameContext } from './../Contexts/UsernameContext'


function SubUser() {

  const username = useContext(UsernameContext)

  return (
    <div>
      <h2>SubUser: {'TEST'}</h2>
      <SubSubUser username={username} />
    </div>
  );
}

export default SubUser;
