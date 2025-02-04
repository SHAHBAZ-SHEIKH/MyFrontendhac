import Signup from "./pages/signup/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/login/Login";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ForgotPasswordSentPage from "./pages/verifyEmail/VerifyEmail";
import OTPverification from "./pages/otpVerification/OTPverification";
import ChangePassword from "./pages/changePassword/ChangePassword";
import  "./index.css";
import New from "./pages/new/New"
import { userInputs } from "./formsource";

import UserDashboard from "./pages/userdashboard/UserDashboard";
import { useState } from "react";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import Home from "./pages/home/Home";
import LoanRequestForm from "./components/loanRequestForm/LoanRequestForm";
import AdminDashBoard from "./pages/adminDashboard/AdminDashBoard";
import List from "./pages/list/List";




function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup  /> } />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/verify-email' element={<ForgotPasswordSentPage />} />
        <Route path="/otp-verification" element={<OTPverification />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/loanRequestForm" element={<LoanRequestForm />} />
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/users" element={<List columns={userColumns}/>} />
        <Route
                path="newUser"
                element={
                  
                    <New inputs={userInputs} title="Add New User" />
                
                }
              />
        
        
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
