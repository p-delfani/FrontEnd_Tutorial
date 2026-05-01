// server/routes/adminRoutes.js
import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/userModel.js";

const router = express.Router();

// 📋 گرفتن لیست تمام کاربران
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربران", error: error.message });
  }
});

// 🗑 حذف کاربر
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }
    res.json({ message: "کاربر حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف کاربر", error: error.message });
  }
});

// 🔁 تغییر نقش کاربر
router.put("/users/:id/role", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "کاربر یافت نشد" });
    }

    user.role = role;
    await user.save();
    res.json({ message: "نقش کاربر به‌روزرسانی شد", user });
  } catch (error) {
    res.status(500).json({ message: "خطا در تغییر نقش", error: error.message });
  }
});

export default router;
