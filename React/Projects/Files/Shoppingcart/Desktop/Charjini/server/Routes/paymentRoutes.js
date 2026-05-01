import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Payment from "../Models/paymentModel.js";

const router = express.Router();

// 🔹 مشاهده تمام پرداخت‌ها (ادمین)
router.get("/all", protect, async (req, res) => {
  try {
    const payments = await Payment.find().populate("user unit");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "خطا در گرفتن پرداخت‌ها", error: err.message });
  }
});

// 🔹 ایجاد/آغاز پرداخت
router.post("/initiate", protect, async (req, res) => {
  try {
    const { unit, amount } = req.body;
    const payment = new Payment({
      user: req.user._id,
      unit,
      amount,
      status: "pending",
    });
    await payment.save();
    res.status(201).json({ message: "پرداخت ایجاد شد", payment });
  } catch (err) {
    res.status(500).json({ message: "خطا در ایجاد پرداخت", error: err.message });
  }
});

// 🔹 لیست پرداخت‌های کاربر
router.get("/", protect, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("unit");
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "خطا در گرفتن پرداخت‌ها", error: err.message });
  }
});

// 🔹 تأیید پرداخت
router.put("/:paymentId/verify", protect, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) return res.status(404).json({ message: "پرداخت یافت نشد" });
    payment.status = "paid";
    await payment.save();
    res.json({ message: "وضعیت پرداخت بروزرسانی شد", payment });
  } catch (err) {
    res.status(500).json({ message: "خطا در تایید پرداخت", error: err.message });
  }
});

export default router;
