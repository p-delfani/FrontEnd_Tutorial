import Payment from "../Models/paymentModel.js";
import Unit from "../Models/unitModel.js";
import User from "../models/userModel.js";

// ایجاد/آغاز یک پرداخت (مثلاً وقتی کاربر دکمه پرداخت را می‌زند)
export const initiatePayment = async (req, res) => {
  try {
    const { unitId, amount, method, metadata } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: "کاربر لاگین نیست" });
    if (!amount) return res.status(400).json({ message: "مبلغ لازم است" });

    const payment = await Payment.create({
      user: userId,
      unit: unitId || null,
      amount,
      method: method || "manual",
      status: "pending",
      metadata: metadata || {}
    });

    // در این مرحله: اینجا می‌توانی درخواست به درگاه واقعی بزنی و payment.refId را ذخیره کنی
    // برای الان یک لینک mock برمی‌گردانیم که فرانت با آن کار کند
    const paymentUrl = `https://mock-pay.local/pay?paymentId=${payment._id}`;

    res.status(201).json({ paymentId: payment._id, paymentUrl, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ایجاد پرداخت", error: err.message });
  }
};

// لیست پرداخت‌ها (admin همه را می‌بیند، resident فقط پرداخت‌های خودش)
export const listPayments = async (req, res) => {
  try {
    const user = req.user;
    let payments;
    if (user.role === "admin") {
      payments = await Payment.find().populate("user", "name email").populate("unit", "unitNumber residentName");
    } else {
      payments = await Payment.find({ user: user.id }).populate("unit", "unitNumber residentName");
    }
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت پرداخت‌ها", error: err.message });
  }
};

// تأیید تراکنش (callback/verify از درگاه) — معمولاً درگاه به این route بعد از پرداخت redirect می‌کند یا سرور سمت سرور verify می‌کند
export const verifyPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, refId } = req.body; // در حالت واقعی داده از درگاه میاد

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ message: "پرداخت پیدا نشد" });

    payment.status = status === "success" ? "success" : status === "failed" ? "failed" : payment.status;
    if (refId) payment.refId = refId;

    await payment.save();

    // اگر پرداخت موفق بود می‌تونی اینجا bill یا unit را آپدیت کنی
    // مثال ساده: اگر unit وجود داشت، flag isPaid را ست می‌کنیم (این منطق را طبق نیازت تغییر بده)
    if (payment.status === "success" && payment.unit) {
      await Unit.findByIdAndUpdate(payment.unit, { isPaid: true });
    }

    res.json({ message: "وضعیت پرداخت بروزرسانی شد", payment });
  } catch (err) {
    res.status(500).json({ message: "خطا در تایید پرداخت", error: err.message });
  }
};

// نمایش تمام پرداخت‌ها (فقط برای ادمین)
/*export const getAllPayments = async (req, res) => {
  try {
    // بررسی نقش کاربر
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "دسترسی غیرمجاز" });
    }

    const payments = await Payment.find().populate("user", "email name");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت پرداخت‌ها", error: error.message });
  }
};
*/

export const getAllPayments = async (req, res) => {
  try {
    // بررسی نقش
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "دسترسی غیرمجاز" });
    }

    // دریافت همه پرداخت‌ها
    const payments = await Payment.find()
      .populate("user", "name email")
      .populate("unit", "unitNumber");

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت پرداخت‌ها", error: err.message });
  }
};
