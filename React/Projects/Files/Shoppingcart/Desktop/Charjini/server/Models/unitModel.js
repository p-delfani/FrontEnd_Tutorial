import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    required: true,
  },
  residentName: {
    type: String,
    required: true,
  },
  phone: String,
  email: String,
  monthlyCharge: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Unit = mongoose.model("Unit", unitSchema);
export default Unit;
