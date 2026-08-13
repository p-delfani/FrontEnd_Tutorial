import { memo } from "react";

const Users = ({ users }) => {
  console.log(`[Users.jsx] Re-Rendered`);

  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
};

export default memo(Users, (prevProps, nextProps) => {
  console.log({ prevProps, nextProps });

  return prevProps.users[0] === nextProps.users[0]; // only re-render if the first user has changed
});
