import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("رمز عبور و تکرار آن یکسان نیست!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "خطا در ثبت‌نام");
        return;
      }

      alert("ثبت‌نام با موفقیت انجام شد 🎉");
      navigate("/login");
    } catch (err) {
      alert("ارتباط با سرور برقرار نشد ❌");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">ثبت‌نام در سامانه شارژینو</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>نام و نام خانوادگی</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>ایمیل</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>رمز عبور</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>تکرار رمز عبور</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-login">ثبت‌نام</button>

          <p className="register-link">
            حساب کاربری دارید؟{" "}
            <span onClick={() => navigate("/login")}>ورود</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
