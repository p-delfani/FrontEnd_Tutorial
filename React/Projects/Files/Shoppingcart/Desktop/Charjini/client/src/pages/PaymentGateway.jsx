
import React, { useState, useEffect } from "react";
import "./PaymentGateway.css";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const amountFromState = location.state?.amount ?? 6500000;
  const unitNumber = location.state?.unitNumber ?? "";
  const description = location.state?.description ?? "";

  const [card, setCard] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [exp, setExp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [timer, setTimer] = useState(300);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!card || !cvv2 || !exp) {
      setError("فیلدهای کارت را کامل کنید");
      return;
    }

    setProcessing(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          unit: unitNumber || null,
          amount: Number(amountFromState),
          method: "card",
          metadata: { description },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "خطا در ثبت پرداخت");

      localStorage.setItem("userDebt", "0");
      localStorage.setItem("paymentStatus", "paid");

      setSuccess(true);

      setTimeout(() => {
        navigate("/new-payment", {
          state: { paymentDone: true, paidAmount: Number(amountFromState) },
        });
      }, 2000);

    } catch (err) {
      setError(err.message || "خطا در پردازش پرداخت");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="gateway-wrapper">
      <div className="gateway-box">
        <div className="bank-header">
          <img src="public/bank-logo.png" className="gateway-logo" />
          <h3>درگاه پرداخت الکترونیک</h3>
        </div>

        {success && (
          <div style={{ color: "lightgreen", marginBottom: 12, fontSize: 18 }}>
            پرداخت با موفقیت انجام شد ✔
          </div>
        )}

        {!success && (
          <>
            <div className="security-warning">لطفاً اطلاعات کارت خود را در اختیار دیگران قرار ندهید.</div>

            <div className="amount-section">
              <span>مبلغ قابل پرداخت:</span>
              <strong>{Number(amountFromState).toLocaleString()} تومان</strong>
            </div>

            <div className="timer-box">
              زمان باقی‌مانده برای پرداخت: <span>{formatTime()}</span>
            </div>

            {error && <div style={{ color: "salmon", marginTop: 8 }}>{error}</div>}

            <form className="gateway-form" onSubmit={handleSubmit}>
              <label>شماره کارت</label>
              <input maxLength="19" value={card} onChange={(e) => setCard(e.target.value)} />

              <label>CVV2</label>
              <input type="password" maxLength="4" value={cvv2} onChange={(e) => setCvv2(e.target.value)} />

              <label>تاریخ انقضا</label>
              <input type="password" maxLength="5" value={exp} onChange={(e) => setExp(e.target.value)} />

              <label>کد امنیتی</label>
              <div className="captcha-wrap">
                <input maxLength="6" value={captcha} onChange={(e) => setCaptcha(e.target.value)} />
                <div className="captcha-box">34X7F</div>
              </div>

              <button className="gateway-pay-btn" type="submit" disabled={processing}>
                {processing ? "در حال پردازش..." : "پرداخت نهایی"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;