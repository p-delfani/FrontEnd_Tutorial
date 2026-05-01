import { protect } from "../middleware/authMiddleware.js";
import Payment from "../Models/paymentModel.js";

// گرفتن پرداخت‌های کاربر لاگین شده
router.get("/user", protect, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: "خطا در دریافت لیست پرداخت‌ها" });
  }
});
