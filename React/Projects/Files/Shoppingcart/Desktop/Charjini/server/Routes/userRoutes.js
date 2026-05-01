import express from "express";
import User from "../models/userModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// ===============================
// 📌 دریافت همه کاربران
// ===============================
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربران", error });
  }
});


// ===============================
// 📌 دریافت کاربر با id
// ===============================
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(404).json({ message: "کاربر یافت نشد" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربر", error });
  }
});


// ===============================
// 📌 ایجاد کاربر جدید
// ===============================
router.post("/", protect, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "این ایمیل قبلاً وجود دارد" });

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || "resident",
    });

    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: "خطا در ایجاد کاربر", error });
  }
});


// ===============================
// 📌 ویرایش کاربر
// ===============================
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "کاربر پیدا نشد" });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "خطا در بروزرسانی کاربر", error });
  }
});


// ===============================
// 📌 حذف کاربر
// ===============================
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: "کاربر پیدا نشد" });

    res.json({ message: "کاربر با موفقیت حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف کاربر", error });
  }
});

export default router;
