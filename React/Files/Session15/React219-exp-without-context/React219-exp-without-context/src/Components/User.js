import React from "react";
import SubUser from "./SubUser";

function User({ username }) {
  return (
    <div>
      <h2>User: {username}</h2>
      <SubUser username={username} />
    </div>
  );
}

export default User;
