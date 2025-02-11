import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ForgotPasswordSentPage from "./pages/verifyEmail/VerifyEmail";
import OTPverification from "./pages/otpVerification/OTPverification";
import ChangePassword from "./pages/changePassword/ChangePassword";
import "./index.css";
import New from "./pages/new/New";
import { userInputs } from "./formsource";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import { useState } from "react";
import { appointmentColumns, userColumns, LoanRequest } from "./datatablesource";
import Home from "./pages/home/Home";
import LoanRequestForm from "./components/loanRequestForm/LoanRequestForm";
import AdminDashBoard from "./pages/adminDashboard/AdminDashBoard";
import List from "./pages/list/List";
import { useSelector } from "react-redux";
import Single from "./pages/single/Single";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current user's role from Redux
  const role = useSelector((state) => state.user?.currentUser?.data?.role);
  const isAuthenticated = useSelector((state) => state.user.currentUser);

  const ProtectedRoute = ({ element, roleRequired }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (role !== roleRequired) {
      return <Navigate to="/" />;
    }
    return element;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/verify-email" element={<ForgotPasswordSentPage />} />
        <Route path="/otp-verification" element={<OTPverification />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/loanRequestForm" element={<LoanRequestForm />} />

        {/* Admin Routes - Only Admin can access */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roleRequired="admin" element={<AdminDashBoard />} />} />
        <Route path="/user" element={<ProtectedRoute roleRequired="admin" element={<List columns={userColumns} />} />} />
        <Route path="/newUser" element={<ProtectedRoute roleRequired="admin" element={<New inputs={userInputs} title="Add New User" />} />} />
        <Route path="/loan" element={<ProtectedRoute roleRequired="admin" element={<List columns={LoanRequest} />} />} />
        <Route path="/appointment" element={<ProtectedRoute roleRequired="admin" element={<List columns={appointmentColumns} />} />} />
        <Route path="/loan/loan/:loanId" element={<ProtectedRoute roleRequired="admin" element={<Single/>} />} />

        {/* User Dashboard */}
        <Route path="/user/dashboard" element={<UserDashboard isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setIsSidebarOpen={setIsSidebarOpen} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
