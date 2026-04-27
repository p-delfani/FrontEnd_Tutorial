import useFetch from "./hooks/useFetch";

function App() {

  const {posts, isPending, error} = useFetch('https://jsonplaceholder.typicode.com/posts')

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {isPending && <div>Loding ... :))</div>}
      {
        posts && posts.map(post => (
          <div key={post.id}>
            <h2>{post.id} - {post.title}</h2>
            <hr />
          </ div>
        ))
      }
    </div>
  );
}

export default App;
