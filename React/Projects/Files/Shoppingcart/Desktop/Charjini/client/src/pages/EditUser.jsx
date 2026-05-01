import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedName = localStorage.getItem("userFullname") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";

    setName(storedName);
    setEmail(storedEmail);
  }, []);

  const getIdFromToken = (token) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
      return payload.id || payload._id || null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");

    if (!userId || userId === "undefined" || userId === "null" || userId.trim() === "") {
      if (!token) return navigate("/login");

      const extracted = getIdFromToken(token);
      if (!extracted) return navigate("/login");

      userId = extracted;
      localStorage.setItem("userId", userId);
    }

    setSaving(true);

    try {
      const API_URL = `${import.meta.env.VITE_API_URL}/api/users/${userId}`;

      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.clear();
        return navigate("/login");
      }

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "خطا در بروزرسانی اطلاعات");
        return;
      }

      localStorage.setItem("userFullname", data.fullname || data.name || name);
      localStorage.setItem("userEmail", data.email || email);
      localStorage.setItem("userId", data._id || userId);

      // 🔥 اطلاع‌رسانی به داشبورد که داده جدید رسیده
      window.dispatchEvent(new Event("user-updated"));

      alert("اطلاعات با موفقیت بروزرسانی شد ✔");
      navigate("/user-dashboard");
    } catch (err) {
      console.error("EditUser error:", err);
      alert("خطا در اتصال به سرور");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <div className="theme-switch-wrap">
        <button className="theme-switch" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          <span className="shape">{theme === "dark" ? <FiSun /> : <FiMoon />}</span>
        </button>
      </div>

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top">
          <div className="brand">شارژینو</div>
          <button className="collapse-btn" onClick={() => setSidebarOpen(s => !s)}>
            <FiChevronLeft />
          </button>
        </div>

        <nav className="menu">
          <ul>
            <li><a href="/user-dashboard">داشبورد</a></li>
            <li><a href="/new-payment">ثبت پرداخت جدید</a></li>
            <li className="active"><a href="/edit-user">ویرایش اطلاعات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => { localStorage.clear(); navigate("/login"); }}>خروج</button>
        </div>
      </aside>

      <main className="main">
        <header className="main-header">
          <h1 className="page-title">ویرایش اطلاعات</h1>
          <p className="subtitle">اطلاعات حساب کاربری خود را بروزرسانی کنید</p>
        </header>

        <section className="panels">
          <div className="panel card glass">
            <h3 className="panel-title">فرم ویرایش اطلاعات</h3>

            <div className="panel-body">
              <form className="edit-form" onSubmit={handleSubmit}>
                <label>نام و نام خانوادگی:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>ایمیل:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <button type="submit" className="submit-btn" disabled={saving}>
                  {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditUser;
