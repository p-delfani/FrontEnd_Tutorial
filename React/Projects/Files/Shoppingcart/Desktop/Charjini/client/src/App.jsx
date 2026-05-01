import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NewPayment from "./pages/NewPayment.jsx";
import EditUser from "./pages/EditUser.jsx";

import PaymentsAdminDashboard from "./pages/PaymentsAdminDashboard.jsx";
import ReportsAdminDashboard from "./pages/ReportsAdminDashboard.jsx";
import UnitsAdminDashboard from "./pages/UnitsAdminDashboard.jsx";
import UsersAdminDashboard from "./pages/UsersAdminDashboard.jsx";

import PaymentGateway from "./pages/PaymentGateway.jsx"; // ← صفحه جدید

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/new-payment" element={<NewPayment />} />
        <Route path="/edit-user" element={<EditUser />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-payments" element={<PaymentsAdminDashboard />} />
        <Route path="/admin-reports" element={<ReportsAdminDashboard />} />
        <Route path="/admin-units" element={<UnitsAdminDashboard />} />
        <Route path="/admin-users" element={<UsersAdminDashboard />} />

        {/* 🔥 صفحه جدید درگاه پرداخت */}
        <Route path="/payment-gateway" element={<PaymentGateway />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
