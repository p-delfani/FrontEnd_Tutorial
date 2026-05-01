import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import {
  FiUser,
  FiCreditCard,
  FiHome,
  FiSun,
  FiMoon,
  FiChevronLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getUserPayments } from "../api/api.js";

const UserDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = {
    fullname: localStorage.getItem("userFullname") || "کاربر تست",
    unitNumber: "A1",
    monthlyCharge: "6,500,000",
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setLoading(false);

      try {
        const payData = await getUserPayments(token);

        if (payData && payData.payments?.length > 0) {
          setPayments(payData.payments);
        } else {
          setPayments([
            { _id: 1, amount: 6500000, createdAt: new Date(), method: "درگاه بانکی" },
            { _id: 2, amount: 4200000, createdAt: new Date(), method: "کارت به کارت" },
            { _id: 3, amount: 5100000, createdAt: new Date(), method: "پرداخت حضوری" },
          ]);
        }
      } catch (err) {
        console.log("خطا در دریافت پرداخت‌ها:", err);
        setPayments([
          { _id: 1, amount: 6500000, createdAt: new Date(), method: "درگاه بانکی" },
          { _id: 2, amount: 4200000, createdAt: new Date(), method: "کارت به کارت" },
          { _id: 3, amount: 5100000, createdAt: new Date(), method: "پرداخت حضوری" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>

      {/* Theme switch */}
      <div className="theme-switch-wrap">
        <button
          className="theme-switch"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <span className="shape">
            {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
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
            <li><a href="/user-dashboard">داشبورد</a></li>
            <li><a href="/new-payment">ثبت پرداخت جدید</a></li>
            <li><a href="/edit-user">ویرایش اطلاعات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={handleLogout}>خروج</button>
        </div>
      </aside>

      {/* Main */}
      <main className="main">

        <header className="main-header">
          <h1 className="page-title">{`خوش آمدی ${user.fullname} 👋`}</h1>
          <p className="subtitle">وضعیت واحد و پرداخت‌های اخیر</p>
        </header>

        {/* KPI */}
        <section className="kpis">
          <div className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiHome size={22} /></div>
              <div>
                <div className="kpi-title">شماره واحد</div>
                <div className="kpi-value">{user.unitNumber}</div>
              </div>
            </div>
          </div>

          <div className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiCreditCard size={22} /></div>
              <div>
                <div className="kpi-title">شارژ ماه</div>
                <div className="kpi-value">{user.monthlyCharge} تومان</div>
              </div>
            </div>
          </div>

          <div className="kpi card glass">
            <div className="kpi-left">
              <div className="kpi-icon"><FiUser size={22} /></div>
              <div>
                <div className="kpi-title">نام کاربر</div>
                <div className="kpi-value">{user.fullname}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Panels */}
        <section className="panels">

          {/* Payments table */}
          <div className="panel card glass table-box">
            <h3 className="panel-title">پرداخت‌های اخیر</h3>
            <div className="panel-body">
              {loading ? (
                <div className="placeholder">در حال بارگذاری...</div>
              ) : (
                <table className="payments-table">
                  <thead>
                    <tr>
                      <th>مبلغ</th>
                      <th>تاریخ</th>
                      <th>روش پرداخت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p._id}>
                        <td>{Number(p.amount).toLocaleString()} تومان</td>
                        <td>{new Date(p.createdAt).toLocaleDateString("fa-IR")}</td>
                        <td>{p.method || "درگاه پرداخت"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Neon chart */}
          <div className="panel card glass chart-box">
            <h3 className="panel-title">نمودار پرداخت‌ها</h3>
            <div className="chart-wrapper">
              <div className="bar" data-h="40" style={{height:"40%"}}></div>
              <div className="bar" data-h="75" style={{height:"75%"}}></div>
              <div className="bar" data-h="55" style={{height:"55%"}}></div>
              <div className="bar" data-h="90" style={{height:"90%"}}></div>
              <div className="bar" data-h="65" style={{height:"65%"}}></div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
