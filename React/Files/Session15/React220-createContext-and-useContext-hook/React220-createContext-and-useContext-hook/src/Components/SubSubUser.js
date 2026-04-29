import React, { useContext } from "react";
import SubSubSubUser from "./SubSubSubUser";

import { UsernameContext } from './../Contexts/UsernameContext'

function SubSubUser() {

  const username = useContext(UsernameContext)

  return (
    <div>
      <h2>SubSubUser: {username}</h2>
      <SubSubSubUser />
    </div>
  );
}

export default SubSubUser;
