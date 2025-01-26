import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordSentPage = () => {
  const user = useSelector((state) => state.user?.currentUser.data);
  const email = user?.email;
  console.log("email",email)
  const navigate = useNavigate();
  
  const handleResend = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgotpassword",
        { email },
        { withCredentials: true }
      );
      console.log(res.data);
      
      
      toast.success(res.data.message);
      console.log("res", res);
      setTimeout(() => {
        navigate("/verify-email");
      }, 2000);
    } catch (error) {
      console.log("error",error)
      
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          We have sent a verification to your email.
        </h2>

        <p className="text-sm text-center text-gray-600 mb-4">
          Please check your inbox, including the spam folder.
        </p>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Email Address: <span className="text-blue-600">{email}</span>
          </p>

          <p className="text-sm text-gray-600 mb-6">
            If you don't see the email, you can resend the verification email.
          </p>

          <button
            onClick={handleResend}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordSentPage;
