import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "خطا در ورود");
        return;
      }

      const user = data.user;

      // ذخیره JWT
      localStorage.setItem("token", data.token);

      // ذخیره نقش
      localStorage.setItem("role", user.role || "resident");

      // ذخیره مطمئن اطلاعات کاربر
      localStorage.setItem("userId", user._id || "");
      localStorage.setItem("userEmail", user.email || "");
      localStorage.setItem("userFullname", user.fullname || user.name || "کاربر");

      // ذخیره واحد و شارژ (برای داشبورد)
      localStorage.setItem("unitNumber", user.unitNumber ?? "-");
      localStorage.setItem("monthlyCharge", user.monthlyCharge ?? "-");

      // هدایت
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("ارتباط با سرور برقرار نشد");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">ورود به سامانه شارژینو</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ایمیل</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>رمز عبور</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-login">ورود</button>

          <p className="register-link">
            حساب کاربری ندارید؟{" "}
            <span onClick={() => navigate("/register")}>ثبت‌نام کنید</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
