import React, { useState } from "react";

function User({ id, name, age }) {
  const [users, setUsers] = useState([
    { id: 1, name: "Amin", age: 22 },
    { id: 2, name: "Qadir", age: 20 },
    { id: 3, name: "Sasan", age: 23 },
  ]);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>
            {user.id} - {user.name}
          </h3>
          <hr />
        </div>
      ))}
    </div>
  );
}


export default User;
