import React, { useState, useEffect } from "react";
import "./PaymentsAdminDashboard.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentsAdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [userDebt, setUserDebt] = useState(6500000);
  const [paymentStatus, setPaymentStatus] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    unitNumber: "",
    amount: "",
    description: "پرداخت شارژ ماهانه",
  });

  useEffect(() => {
    fetchUserDebt();

    if (location.state?.paymentDone || localStorage.getItem("paymentStatus") === "paid") {
      setPaymentStatus(true);
      setUserDebt(0);
      setFormData(prev => ({ ...prev, amount: "0" }));
      localStorage.removeItem("paymentStatus");
    }
  }, []);

  const fetchUserDebt = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        if (!paymentStatus) {
          setUserDebt(data.debt || 6500000);
          setFormData(prev => ({
            ...prev,
            amount: (data.debt || 6500000).toLocaleString(),
          }));
        }
      }
    } catch (err) {
      console.log("Error fetching debt:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`adm-root ${theme === "dark" ? "theme-dark" : "theme-light"}`}>

      {/* Theme toggle */}
      <div className="theme-switch-wrap">
        <button
          className="theme-switch"
          onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
        >
          <span className="shape">{theme === "dark" ? <FiSun /> : <FiMoon />}</span>
        </button>
      </div>

      {/* Sidebar */}
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
            <li><a href="/edit-user">ویرایش اطلاعات</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => navigate("/login")}>خروج</button>
        </div>
      </aside>

      <div className="admin-sub-page">
        <h1 className="page-title">درگاه پرداخت</h1>

        {/* بدهی قابل پرداخت */}
        <div className="debt-box">
          <h3>بدهی قابل پرداخت شما</h3>
          <div className="debt-amount">
            {paymentStatus || userDebt === 0
              ? "تسویه شده ✔"
              : `${userDebt.toLocaleString()} تومان`}
          </div>
        </div>

        {/* Payment box */}
        <div className="content-box payment-gateway-box">
          <h2>جزئیات پرداخت</h2>

          <form className="payment-form">
            <label>نام کاربر</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="نام و نام خانوادگی"
            />

            <label>شماره واحد</label>
            <input
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              required
              placeholder="مثلاً A1"
            />

            <label>مبلغ پرداختی</label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <label>توضیحات</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <button
              type="button"
              className="pay-btn"
              onClick={() =>
                navigate("/payment-gateway", {
                  state: { amount: userDebt || 6500000 },
                })
              }
            >
              پرداخت
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentsAdminDashboard;
