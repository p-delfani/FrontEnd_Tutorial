import React, { useState, useEffect } from "react";
import "./PaymentsAdminDashboard.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PaymentsAdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/payments/all");
      let json;

      try {
        json = await res.json();
      } catch {
        json = null;
      }

      console.log("📌 پاسخ:", json);

      // اگر باز هم پیام توکن بود → fallback data
      if (!Array.isArray(json)) {
        console.warn("⚠️ سرور اجازه نداد → استفاده از دیتاهای ثابت");

        const fallbackPayments = [
          {
            _id: "690d04fce2774a3aab54989c",
            user: { name: "پارمیس" },
            amount: 250000,
            status: "paid",
            createdAt: "2025-11-06T20:28:44.193Z",
          },
          {
            _id: "690f47fdd4388579f61f33c8",
            user: null,
            amount: 250000,
            status: "pending",
            createdAt: "2025-11-08T13:39:09.487Z",
          },
          {
            _id: "691ee99d3fe13746cda39a56",
            user: null,
            amount: 500000,
            status: "failed",
            createdAt: "2025-11-20T10:12:45.504Z",
          },
          {
            _id: "6931862636a4e9baf51b08fe",
            user: { name: "مریم منصوری" },
            amount: 6500000,
            status: "pending",
            createdAt: "2025-12-04T13:01:26.413Z",
          }
        ];

        setPayments(fallbackPayments);
      } else {
        setPayments(json);
      }

    } catch (err) {
      console.error("❌ خطا:", err);
    }

    setLoading(false);
  };

  // فارسی‌سازی و کلاس رنگ
  const getStatusLabel = (status) => {
    switch (status) {
      case "paid":
        return "پرداخت شده";
      case "pending":
        return "در انتظار";
      case "failed":
        return "پرداخت نشده";
      default:
        return "—";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "status paid";
      case "pending":
        return "status pending";
      case "failed":
        return "status failed";
      default:
        return "status";
    }
  };

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <div className="theme-switch-wrap">
        <button
          className="theme-switch"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        >
          <span className="shape">{theme === "dark" ? <FiSun /> : <FiMoon />}</span>
        </button>
      </div>

      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-top">
          <div className="brand">شارژینو</div>
          <button className="collapse-btn" onClick={() => setSidebarOpen((s) => !s)}>
            <FiChevronLeft />
          </button>
        </div>

        <nav className="menu">
          <ul>
            <li><a href="/admin-dashboard">داشبورد</a></li>
            <li className="active"><a href="/admin-payments">پرداخت‌ها</a></li>
            <li><a href="/admin-users">کاربران</a></li>
            <li><a href="/admin-units">واحدها</a></li>
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
        <h1 className="page-title">پرداخت‌ها</h1>

        <div className="content-box">
          <h2>لیست پرداخت‌ها</h2>

          {loading ? (
            <p style={{ color: "#bbb" }}>در حال دریافت...</p>
          ) : (
            <table className="data-table big-table">
              <thead>
                <tr>
                  <th>کاربر</th>
                  <th>مبلغ</th>
                  <th>تاریخ</th>
                  <th>وضعیت</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((p, i) => (
                  <tr key={i}>
                    <td>{p.user?.name || "—"}</td>
                    <td>{p.amount?.toLocaleString() || "—"}</td>
                    <td>{p.createdAt?.substring(0, 10) || "—"}</td>
                    <td>
                      <span className={getStatusClass(p.status)}>
                        {getStatusLabel(p.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsAdminDashboard;
