import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ForgotPasswordSentPage from "./pages/verifyEmail/VerifyEmail";
import OTPverification from "./pages/otpVerification/OTPverification";
import ChangePassword from "./pages/changePassword/ChangePassword";
import  "./index.css";
import LandingPage from "./pages/landingpage/LandingPage";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import { useState } from "react";
import LoanRequests from "./components/LoanRequests/LoanRequests";




function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup  /> } />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/verify-email' element={<ForgotPasswordSentPage />} />
        <Route path="/otp-verification" element={<OTPverification />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/user/loan" element={<LoanRequests/>} />
        
        <Route
            path="/user/dashboard"
            element={
              <UserDashboard
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                setIsSidebarOpen={setIsSidebarOpen}
              />
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
