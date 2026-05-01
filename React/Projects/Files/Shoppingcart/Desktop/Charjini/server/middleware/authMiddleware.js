// server/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Middleware: محافظت از مسیرهای خصوصی
 * مسیرهایی که نیاز به لاگین دارند از این استفاده می‌کنند
 */
export const protect = async (req, res, next) => {
  try {
    // گرفتن توکن از header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "توکن وجود ندارد" });
    }

    const token = authHeader.split(" ")[1];

    // بررسی اعتبار توکن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // پیدا کردن کاربر در DB بدون پسورد
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "کاربر یافت نشد" });
    }

    // attach کردن user به req برای استفاده در route بعدی
    req.user = user;

    next();
  } catch (err) {
    console.error("authMiddleware Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "توکن منقضی شده است" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "توکن نامعتبر" });
    } else {
      return res.status(500).json({ message: "خطا در احراز هویت" });
    }
  }
};
