import React, { useState, useEffect } from "react";
import "./ReportsAdminDashboard.css";
import { FiSun, FiMoon, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReportsAdminDashboard = () => {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [range, setRange] = useState("daily");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  /* ================== DATA ================== */
  const dailyReports = [
    { id: 101, fullname: "علیرضا مرادی", unit: "B-12", amount: "250,000", status: "paid", authority: "A3256KHG89", date: "1402/11/22" },
    { id: 102, fullname: "زهرا ملکی", unit: "A-08", amount: "150,000", status: "pending", authority: "U8872KLL12", date: "1402/11/22" },
  ];

  const weeklyReports = [
    { id: 201, fullname: "مریم قائمی", unit: "A-04", amount: "400,000", status: "paid", authority: "D9087UJH22", date: "1402/11/19" },
    { id: 202, fullname: "امیرحسین صادقی", unit: "C-09", amount: "300,000", status: "failed", authority: "X6712LKD33", date: "1402/11/18" },
    { id: 203, fullname: "سارا مهربان", unit: "B-03", amount: "520,000", status: "pending", authority: "T9823GGH55", date: "1402/11/16" },
  ];

  const monthlyReports = [
    { id: 301, fullname: "نازنین نادری", unit: "B-08", amount: "800,000", status: "paid", authority: "I7712JKD55", date: "1402/11/02" },
    { id: 302, fullname: "محمدرضا پاکدل", unit: "A-19", amount: "120,000", status: "paid", authority: "H9871HHS33", date: "1402/11/05" },
    { id: 303, fullname: "کیان سهرابی", unit: "C-10", amount: "950,000", status: "failed", authority: "Z8819QQL22", date: "1402/11/07" },
    { id: 304, fullname: "الهه رفیعی", unit: "D-11", amount: "310,000", status: "pending", authority: "P2271DDK93", date: "1402/11/11" },
  ];

  const getData = () => {
    if (range === "daily") return dailyReports;
    if (range === "weekly") return weeklyReports;
    return monthlyReports;
  };

  const selectedData = getData();

  /* ================== EXPORT FUNCTIONS ================== */

  // 📄 PDF (با پرینت مرورگر)
  const exportPDF = () => {
    window.print();
  };

  // 📊 Excel (CSV بدون پکیج)
  const exportExcel = () => {
    const headers = ["ID", "نام", "واحد", "مبلغ", "وضعیت", "کدرصد", "تاریخ"];
    const rows = selectedData.map(item => [
      item.id,
      item.fullname,
      item.unit,
      item.amount,
      item.status,
      item.authority,
      item.date
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `reports-${range}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`adm-root ${theme}`}>
      <div className="theme-switch-wrap">
        <button className="theme-switch" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <FiSun /> : <FiMoon />}
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
            <li className="active"><a href="/admin-reports">گزارشات</a></li>
            <li><a href="/admin-users">کاربران</a></li>
            <li><a href="/admin-units">واحدها</a></li>
            <li><a href="/admin-payments">پرداخت‌ها</a></li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="logout" onClick={() => navigate("/login")}>خروج</button>
        </div>
      </aside>

      <div className="admin-sub-page">
        <h1 className="page-title">گزارشات مالی</h1>

        <div className="report-range-box">
          <label>نمایش بر اساس:</label>
          <select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="daily">روزانه</option>
            <option value="weekly">هفتگی</option>
            <option value="monthly">ماهانه</option>
          </select>

          {/* ✅ دکمه‌های خروجی */}
          <div className="export-buttons">
            <button onClick={exportPDF} className="export pdf">PDF</button>
            <button onClick={exportExcel} className="export excel">Excel</button>
          </div>
        </div>

        <div className="content-box">
          <h2>گزارش پرداخت‌ها</h2>

          <table className="report-table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>واحد</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>کدرصد</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fullname}</td>
                  <td>{item.unit}</td>
                  <td>{item.amount} تومان</td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === "paid" ? "پرداخت شده" : item.status === "pending" ? "در انتظار" : "ناموفق"}
                    </span>
                  </td>
                  <td>{item.authority}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsAdminDashboard;
