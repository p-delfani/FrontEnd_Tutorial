import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// ثبت‌نام
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "کاربر قبلاً ثبت شده است." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "ثبت‌نام موفق", user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
});

// ورود
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "رمز عبور اشتباه است" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "ورود موفق", token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
});


export default router;
