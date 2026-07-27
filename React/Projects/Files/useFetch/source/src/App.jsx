import "./App.css";
import useFetch from "./hooks/useFetch";

function App() {
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <>
      {loading ? (
        <h1>Please wait ...</h1>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
