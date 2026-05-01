import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "کاربر قبلاً ثبت شده است." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "resident" // فقط یک رشته
    });

    await newUser.save();

    res.status(201).json({ message: "ثبت‌نام موفق", user: { name, email, role: "resident" } });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "رمز عبور اشتباه است." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "ورود موفق", token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "خطای سرور", error: err.message });
  }
};
