import { useEffect } from "react";

function Todo({
  id,
  title,
  description,
  isImportant,
  isCompleted,
  onDo,
  onRemove,
}) {
  // Mount -> Api Fetching - localStorage - Event Handling
  // Updating
  // UnMount -> Remove Event - disConnect

  useEffect(() => {
    console.log(`[Todo.jsx Mounting] - ${title}`);

    return () => {
      console.log(`[Todo.jsx UnMounting] - ${title}`);
    };
  }, []);

  // 1.
  // useEffect(() => {
  //   console.log(`[Todo.jsx Updating] - ${title}`);
  // });

  // 2.
  useEffect(() => {
    console.log(`[Todo.jsx Updating] - ${title}`);
  }, [isCompleted]);

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
