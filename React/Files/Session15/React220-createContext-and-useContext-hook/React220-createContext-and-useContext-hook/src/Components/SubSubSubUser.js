import React, { useContext } from "react";

import { UsernameContext } from './../Contexts/UsernameContext'

function SubSubSubUser() {

  const username = useContext(UsernameContext)

  return (
    <div>
      <h2>SubSubSubUser: {username}</h2>
    </div>
  );
}

export default SubSubSubUser;
