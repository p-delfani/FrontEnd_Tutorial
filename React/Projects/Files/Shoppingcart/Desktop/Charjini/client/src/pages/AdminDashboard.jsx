import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import {
  FiUsers,
  FiCreditCard,
  FiHome,
  FiSun,
  FiMoon,
  FiChevronLeft
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // داده نمونه اعلان‌ها
  const notifications = [
    { id: 1, text: "واحد A1 شارژ رو پرداخت کرد", type: "paid" },
    { id: 2, text: "واحد B2 هزینه تعمیرات رو پرداخت کرد", type: "paid" },
    { id: 3, text: "واحد C3 پرداخت نکرده", type: "pending" },
    { id: 4, text: "واحد D4 پرداخت نکرده", type: "pending" },
  ];

  // داده نمونه جدول پرداخت‌ها
  const samplePayments = [
    { id: 1, user: "پارمیس", unit: "A1", amount: 250000, status: "paid" },
    { id: 2, user: "علی", unit: "B2", amount: 350000, status: "pending" },
    { id: 3, user: "سمیرا", unit: "C3", amount: 420000, status: "paid" },
    { id: 4, user: "مهدی", unit: "D4", amount: 310000, status: "pending" },
    { id: 5, user: "نرگس", unit: "E5", amount: 500000, status: "paid" },
  ];

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      
      {/* Theme switch */}
      <div className="theme-switch-wrap">
        <button
          className="theme-switch"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="shape">
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </span>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top">
          <div className="brand">شارژینو</div>
          <button className="collapse-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiChevronLeft />
          </button>
        </div>

        <nav className="menu">
          <ul>
            <li className="active"><a href="/admin-dashboard">داشبورد</a></li>
            <li><a href="/admin-users">کاربران</a></li>
            <li><a href="/admin-units">واحدها</a></li>
            <li><a href="/admin-payments">پرداخت‌ها</a></li>
            <li><a href="/admin-reports">گزارشات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => navigate("/login")}>خروج</button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="main-header">
          <h1 className="page-title">داشبورد مدیر</h1>
          <p className="subtitle">نگاه کلی سیستم — آمار و فعالیت‌ها</p>
        </header>

        <section className="kpis">
          <article className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiUsers size={22} /></div>
              <div>
                <div className="kpi-title">کاربران</div>
                <div className="kpi-value">1,254</div>
              </div>
            </div>
            <div className="kpi-meta">+3.2% این ماه</div>
          </article>

          <article className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiCreditCard size={22} /></div>
              <div>
                <div className="kpi-title">پرداخت‌ها</div>
                <div className="kpi-value">۳۴,۸۰۰,۰۰۰</div>
              </div>
            </div>
            <div className="kpi-meta">+8.7% این ماه</div>
          </article>

          <article className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiHome size={22} /></div>
              <div>
                <div className="kpi-title">واحدها</div>
                <div className="kpi-value">۲۳۸</div>
              </div>
            </div>
            <div className="kpi-meta">۸ درصد بدهکار</div>
          </article>
        </section>

        {/* پنل‌ها */}
        <section className="panels">

          {/* جدول پرداخت‌ها */}
          <div className="panel card glass">
            <h3 className="panel-title">آخرین پرداخت‌ها</h3>
            <div className="panel-body table">
              <table>
                <thead>
                  <tr>
                    <th>کاربر</th>
                    <th>واحد</th>
                    <th>مبلغ</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {samplePayments.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.user}</td>
                      <td>{payment.unit}</td>
                      <td>{payment.amount.toLocaleString()}</td>
                      <td className={payment.status}>
                        {payment.status === "paid" ? "موفق" : "در انتظار"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* پنل اعلان‌ها */}
          <div className="panel card glass">
            <h3 className="panel-title">اعلان‌ها</h3>
            <div className="panel-body notifications">
              {notifications.map(n => (
                <div key={n.id} className={`notification ${n.type}`}>
                  {n.text}
                </div>
              ))}
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
