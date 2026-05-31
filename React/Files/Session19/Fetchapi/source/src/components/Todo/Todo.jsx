import { useEffect, useState } from "react";

function Todo({
  id,
  title,
  description,
  isImportant,
  isCompleted,
  onDo,
  onRemove,
}) {
  const [users, setUsers] = useState([]);

  // Retry
  // Exponential Backoff -> 1, 2, 4, 8, 16, ...

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      const retry = 3;
      let attempt = 1;

      for (attempt; attempt <= retry; attempt++) {
        try {
          const response = await fetch(
            "https://jsonplaceholde.typicode.com/users",
            {
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            throw new Error("Request Failed ...");
          }

          const data = await response.json();

          console.log(data);

          return setUsers(data);

          // break;
        } catch (err) {
          console.log(`Attempt ${attempt} failed ...`);

          if (attempt === retry) {
            throw err;
          }

          const backoffTime = 2 ** (attempt - 1) * 1000;
          await new Promise((res) => setTimeout(res, backoffTime)); // 1s, 2s, 4s
        }
      }
    };

    fetchUsers();

    // Clean-Up 🧹
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="space-y-0.5">
      <article className="task-card">
        <div className="task-content">
          <div>
            <h3>{title}</h3>
            <p className="task-desc">{description} </p>
          </div>
        </div>

        <div className="moderate">
          <div className="flex items-center **:min-w-max gap-2">
            {isCompleted && (
              <span className="status-label completed"> تکمیل شده </span>
            )}
            {isImportant && <span className="priority code-1"> مهم </span>}
          </div>
          <div className="moderate-btns">
            <button className="complete-task" onClick={() => onDo(id)}>
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button className="undone-btn" onClick={() => onRemove(id)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Todo;
