import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import unitRoutes from "./Routes/unitRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // اجازه دسترسی فرانت
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

// تست سرور
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
