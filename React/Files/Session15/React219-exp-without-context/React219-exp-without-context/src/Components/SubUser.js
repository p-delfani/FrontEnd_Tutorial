import React from "react";
import SubSubUser from "./SubSubUser";

function SubUser({ username }) {
  return (
    <div>
      <h2>SubUser: {username}</h2>
      <SubSubUser username={username} />
    </div>
  );
}

export default SubUser;
