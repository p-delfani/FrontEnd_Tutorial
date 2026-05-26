import { HiOutlineTrash, HiCheck } from "react-icons/hi2";

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

  return (
    <div className={`task-card ${isCompleted ? "done" : ""}`}>
      {/* بخش محتوای تسک */}
      <div className="task-content">
        <div className="flex flex-col text-right">
          <h3 className={`font-bold text-zinc-800 ${isCompleted ? "line-through opacity-50" : ""}`}>
            {title}
          </h3>
          <p className="task-desc">{description}</p>
          
          <div className="flex gap-2 mt-2">
            {isImportant && (
              <span className="priority code-3">مهم</span>
            )}
            {isCompleted && (
              <span className="status-label completed">تکمیل شده</span>
            )}
          </div>
        </div>
      </div>

      {/* بخش دکمه‌های عملیات (مطابق با CSS شما) */}
      <div className="moderate">
        <div className="moderate-btns">
          {!isCompleted && (
            <button
              onClick={() => onDo(id)}
              className="complete-task p-1 hover:bg-green-50 rounded-full transition-colors"
              title="تکمیل تسک"
            >
              <HiCheck size={22} />
            </button>
          )}
          
          <button
            onClick={() => onRemove(id)}
            className="remove-btn p-1 hover:bg-orange-50 rounded-full transition-colors"
            title="حذف تسک"
          >
            <HiOutlineTrash size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
