import React, { useState, useEffect } from "react";
import "../pages/UserAdminDashboard.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserAdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ================= Fetch Users ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= Add ================= */
  const handleAdd = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        role: "resident",
      }),
    });

    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  /* ================= Delete ================= */
  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  /* ================= Edit ================= */
  const startEdit = (u) => {
    setEditingUser(u._id);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:4000/api/users/${editingUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        ...(form.password && { password: form.password }),
      }),
    });

    setEditingUser(null);
    setForm({ name: "", email: "", password: "" });
    fetchUsers();
  };

  /* ================= SEARCH FILTER (✅ این مهمه) ================= */
  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  });

  const translateRole = (role) => (role === "admin" ? "مدیر" : "ساکن");

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <div className="theme-switch-wrap">
        <button
          className="theme-switch"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          <span className="shape">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </span>
        </button>
      </div>

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top">
          <div className="brand">شارژینو</div>
          <button
            className="collapse-btn"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <FiChevronLeft />
          </button>
        </div>

        <nav className="menu">
          <ul>
            <li><a href="/admin-dashboard">داشبورد</a></li>
            <li className="active"><a href="/admin-users">کاربران</a></li>
            <li><a href="/admin-units">واحدها</a></li>
            <li><a href="/admin-payments">پرداخت‌ها</a></li>
            <li><a href="/admin-reports">گزارشات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => navigate("/login")}>
            خروج
          </button>
        </div>
      </aside>

      <div className="admin-sub-page">
        <h1 className="page-title">مدیریت کاربران</h1>

        <div className="content-grid">
          {/* ✅ Form */}
          <div className="content-box">
            <h2>{editingUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}</h2>

            <form
              className="form-box"
              onSubmit={editingUser ? handleUpdate : handleAdd}
            >
              <input
                type="text"
                placeholder="نام کاربر"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="ایمیل"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="رمز عبور"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required={!editingUser}
              />

              <button>{editingUser ? "ثبت تغییرات" : "افزودن"}</button>
            </form>
          </div>

          {/* ✅ Table + Search */}
          <div className="content-box">
            <h2>لیست کاربران</h2>

            {/* 🔍 SEARCH INPUT */}
            <input
              className="search-input"
              type="text"
              placeholder="جستجو بر اساس نام یا ایمیل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
              <p style={{ textAlign: "center" }}>در حال بارگذاری...</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>نام</th>
                    <th>ایمیل</th>
                    <th>نقش</th>
                    <th>عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u) => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{translateRole(u.role)}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => startEdit(u)}
                          >
                            ویرایش
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(u._id)}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", opacity: 0.7 }}>
                        کاربری یافت نشد
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAdminDashboard;
  