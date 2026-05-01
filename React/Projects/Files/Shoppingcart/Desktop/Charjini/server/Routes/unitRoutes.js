import express from "express";
import Unit from "../models/unitModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// گرفتن همه واحدها
router.get("/", protect, async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: "خطای سرور" });
  }
});

// اضافه کردن واحد جدید
router.post("/", protect, async (req, res) => {
  try {
    const newUnit = await Unit.create(req.body);
    res.json(newUnit);
  } catch (err) {
    res.status(500).json({ error: "خطای سرور" });
  }
});

// ویرایش واحد
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "خطا در آپدیت" });
  }
});

// حذف واحد
router.delete("/:id", protect, async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.json({ message: "واحد حذف شد" });
  } catch (err) {
    res.status(500).json({ error: "خطا در حذف" });
  }
});

export default router;
