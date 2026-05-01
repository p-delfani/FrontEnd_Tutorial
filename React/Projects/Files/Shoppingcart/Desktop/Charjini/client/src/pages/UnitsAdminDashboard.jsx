import React, { useState, useEffect } from "react";
import "../pages/UnitsAdminDashboard.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UnitsAdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [units, setUnits] = useState([]);
  const [search, setSearch] = useState(""); // ✅ سرچ

  const [unitNumber, setUnitNumber] = useState("");
  const [residentName, setResidentName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [monthlyCharge, setMonthlyCharge] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ================= Fetch Units =================
  const fetchUnits = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/units", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUnits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  // ================= Create / Update =================
  const submitHandler = async (e) => {
    e.preventDefault();

    const body = { unitNumber, residentName, phone, email, monthlyCharge };

    const url = editId
      ? `http://localhost:4000/api/units/${editId}`
      : "http://localhost:4000/api/units";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    setEditId(null);
    setUnitNumber("");
    setResidentName("");
    setPhone("");
    setEmail("");
    setMonthlyCharge("");
    fetchUnits();
  };

  const deleteUnit = async (id) => {
    if (!window.confirm("حذف شود؟")) return;
    await fetch(`http://localhost:4000/api/units/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUnits();
  };

  const startEdit = (u) => {
    setEditId(u._id);
    setUnitNumber(u.unitNumber);
    setResidentName(u.residentName);
    setPhone(u.phone);
    setEmail(u.email);
    setMonthlyCharge(u.monthlyCharge);
  };

  // ✅ فیلتر بر اساس جستجو
  const filteredUnits = units.filter((u) =>
    `${u.unitNumber} ${u.residentName} ${u.phone} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
            <li><a href="/admin-dashboard">داشبورد</a></li>
            <li className="active"><a href="/admin-units">واحدها</a></li>
            <li><a href="/admin-users">کاربران</a></li>
            <li><a href="/admin-payments">پرداخت‌ها</a></li>
            <li><a href="/admin-reports">گزارشات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => navigate("/login")}>خروج</button>
        </div>
      </aside>

      <div className="admin-sub-page">
        <h1 className="page-title">مدیریت واحدها</h1>

        <div className="content-grid">
          <div className="content-box">
            <h2>{editId ? "ویرایش واحد" : "افزودن واحد جدید"}</h2>

            <form className="form-box" onSubmit={submitHandler}>
              <input value={unitNumber} onChange={e => setUnitNumber(e.target.value)} placeholder="شماره واحد" />
              <input value={residentName} onChange={e => setResidentName(e.target.value)} placeholder="نام ساکن" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="شماره تماس" />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="ایمیل" />
              <input value={monthlyCharge} onChange={e => setMonthlyCharge(e.target.value)} placeholder="شارژ ماهانه" />
              <button>{editId ? "به‌روزرسانی" : "افزودن"}</button>
            </form>
          </div>

          <div className="content-box">
            <h2>لیست واحدها</h2>

            {/* ✅ سرچ */}
            <input
              className="search-input"
              placeholder="جستجو..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <table className="data-table">
              <thead>
                <tr>
                  <th>شماره</th>
                  <th>ساکن</th>
                  <th>تلفن</th>
                  <th>ایمیل</th>
                  <th>شارژ</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map(u => (
                  <tr key={u._id}>
                    <td>{u.unitNumber}</td>
                    <td>{u.residentName}</td>
                    <td>{u.phone}</td>
                    <td>{u.email}</td>
                    <td>{u.monthlyCharge}</td>
                    <td>
                      <button className="btn-edit" onClick={() => startEdit(u)}>ویرایش</button>
                      <button className="btn-delete" onClick={() => deleteUnit(u._id)}>حذف</button>
                    </td>
                  </tr>
                ))}
                {filteredUnits.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", opacity: 0.6 }}>
                      موردی یافت نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsAdminDashboard;
