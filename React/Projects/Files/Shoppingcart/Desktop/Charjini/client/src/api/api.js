// api.js
export const getUserInfo = async (token, userId) => {
  if (!token || !userId) throw new Error("توکن یا userId معتبر نیست");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "خطا در دریافت اطلاعات کاربر");
  }

  return res.json();
};

export const getUserPayments = async (token) => {
  if (!token) throw new Error("توکن معتبر نیست");

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "خطا در دریافت پرداخت‌ها");
  }

  return res.json();
};
