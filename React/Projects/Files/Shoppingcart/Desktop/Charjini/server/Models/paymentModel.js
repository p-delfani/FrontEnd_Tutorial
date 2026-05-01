import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // پرداخت‌کننده
  unit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: false }, // مرتبط با واحد (اختیاری)
  amount: { type: Number, required: true },
  method: { type: String, default: "manual" }, // e.g. 'zarinpal', 'payir', 'manual'
  status: { type: String, enum: ["pending", "success", "failed","paid"], default: "pending" },
  refId: { type: String }, // شناسه تراکنش از درگاه
  metadata: { type: Object }, // هر اطلاعات اضافی (اختیاری)
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
