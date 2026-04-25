import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import { useState } from "react";
import NoTodo from "./components/NoTodo/NoTodo";

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (title, description, isImportant) => {
    // Validation ✅

    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      isImportant,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);

    setIsAddModalOpen(false);
  };

  const doTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = true;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = () => {
    if (filter === "all") return todos;

    if (filter === "completed") return todos.filter((todo) => todo.isCompleted);

    if (filter === "not-completed")
      return todos.filter((todo) => !todo.isCompleted);
  };

  return (
    <>
      <Header />

      <main className="container pb-25">
        <div id="headline" className="space-y-3">
          <h1 className="title">
            <img src="./public/images/hourglass.png" className="size-8" />
            <span> مدیریت و برنامه ریزی </span>
          </h1>
          <p className="max-w-[750px] text-zinc-700 text-sm font-Vazir-Medium!">
            سبز تسک ابزاری قدرتمند برای سازماندهی وظایف روزمره، برنامه‌ریزی
            پروژه‌ها و افزایش بهره‌وری شماست. با رابط کاربری ساده و امکانات
            پیشرفته، از پیگیری وظایف تا همکاری تیمی را به آسانی مدیریت کنید.
          </p>
        </div>

        <div className="mt-14 border-b w-full border-zinc-200 flex items-center py-3 justify-between">
          <div></div>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <input id="dd-toggle" type="checkbox" hidden />

              <label className="dd-btn" for="dd-toggle">
                <span>
                  نمایش{" "}
                  {filter === "all"
                    ? "همه"
                    : filter === "completed"
                    ? "تکمیل شده‌ها"
                    : "تکمیل نشده‌ها"}
                </span>
                <i className="fa-solid fa-chevron-down"></i>
              </label>

              <div className="dropdown_menu" role="menu">
                <div className="py-1">
                  <label
                    for="dd-toggle"
                    className="menu-item"
                    onClick={() => setFilter("all")}
                  >
                    همه
                  </label>
                  <label
                    for="dd-toggle"
                    className="menu-item"
                    onClick={() => setFilter("completed")}
                  >
                    تکمیل شده ها
                  </label>
                  <label
                    for="dd-toggle"
                    className="menu-item"
                    onClick={() => setFilter("not-completed")}
                  >
                    در انتظار انجام
                  </label>
                </div>
              </div>
            </div>

            <button
              id="open-dialog"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              <span> ایجاد جدید </span>
              <div className="btn-divider"></div>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        </div>

        {todos.length ? (
          <section id="tasks" className="space-y-30 mt-5">
            <div className="space-y-5">
              <p className="text-sm">تسک های موجود:</p>
              {filteredTodos().map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onDo={doTodo}
                  onRemove={removeTodo}
                />
              ))}
            </div>
            <div className="space-y-5">
              <p className="text-sm">تسک‌های تکمیل‌شده</p>
              {todos.filter((todo) => todo.isCompleted).length ? (
                todos
                  .filter((todo) => todo.isCompleted)
                  .map((todo) => (
                    <Todo
                      key={todo.id}
                      {...todo}
                      onDo={doTodo}
                      onRemove={removeTodo}
                    />
                  ))
              ) : (
                <NoTodo />
              )}
            </div>
          </section>
        ) : (
          <NoTodo />
        )}
      </main>

      {isAddModalOpen && (
        <AddTodoModal
          onClose={() => {
            setIsAddModalOpen(false);
          }}
          addTodoHandler={addTodo}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
