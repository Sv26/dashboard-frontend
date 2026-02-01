import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword";
import VerifyOtp from "./pages/auth/verify-otp/VerifyOtp";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";

import Home from "./pages/dashboard/home/Home";
import Products from "./pages/dashboard/products/Products";
import AddProduct from "./components/products/AddProductModal";
import CSVUpload from "./components/products/CSVUploadModal";

import Invoice from "./pages/dashboard/ invoices/Invoices";
import Statistics from "./pages/dashboard/statistics/Statistics";
import Setting from "./pages/dashboard/settings/Settings";
import "./App.css";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="product">
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="upload" element={<CSVUpload />} />
          </Route>

          <Route path="invoice" element={<Invoice />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Route>
    </Routes>
  );
}
