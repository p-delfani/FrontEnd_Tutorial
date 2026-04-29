import React from "react";
import SubSubSubUser from "./SubSubSubUser";

function SubSubUser({ username }) {
  return (
    <div>
      <h2>SubSubUser: {username}</h2>
      <SubSubSubUser username={username} />
    </div>
  );
}

export default SubSubUser;
