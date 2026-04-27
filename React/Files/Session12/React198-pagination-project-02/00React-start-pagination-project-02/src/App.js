import React, { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTodos, setPaginatedTodos] = useState([]);

  let pageSize = 10;
  let pagesNumbers;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((datas) => {
        setTodos(datas);
      });
  }, []);

  const changePaginate = (newPage) => {
    setCurrentPage(newPage);
  };

  const pagesCount = Math.ceil(todos.length / pageSize);
  pagesNumbers = Array.from(Array(pagesCount).keys());

  return (
    <div>
      {!todos ? (
        "Loading"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.userId}</td>
                <td>{todo.title}</td>
                <td>
                  <p
                    className={
                      todo.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination" aria-current="page">
          {pagesNumbers.map((pageNumber) => (
            <li
              className={
                pageNumber + 1 === currentPage
                  ? "page-item active"
                  : "page-item"
              }
              key={pageNumber + 1}
              onClick={() => changePaginate(pageNumber + 1)}
            >
              <span className="page-link">{pageNumber + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
