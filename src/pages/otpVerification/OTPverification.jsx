import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupFailure, signupSuccess } from '@/redux/userSlice';
import { ToastContainer, toast } from 'react-toastify';


const OTPverification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const userName = useSelector((state)=>state.user.currentUser)
  console.log(userName.data.email)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (element, index) => {
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input if current input is not empty
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pasteData.forEach((char, i) => {
      newOtp[i] = char;
      if (i < 5) {
        inputRefs.current[i + 1].focus();
      }
    });
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp);
    try {
      const token = localStorage.getItem('UserToken'); // Retrieve the token from storage

      const response = await axios.post(
        'http://localhost:5000/api/auth/verifyEmail',
        { otp:enteredOtp },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      // Handle successful verification
      console.log(response.data);
      dispatch(signupSuccess(response.data))
      toast.success(response.data.message);
      setTimeout(()=>{navigate("/login")},3000)
    } catch (error) {
      // Handle errors
      console.error(error.response?.data?.message);
       dispatch(signupFailure())
       toast.error(error.response?.data?.message);
    }
  };


  // Resend OTP

  const resendOTP = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/resendOtp',
        { email: userName.data.email }
      );
      console.log(response.data);
      toast.success(response.data.message);
      dispatch(signupSuccess(response.data))
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.data.message);
    }
  };



  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <ToastContainer/>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Enter your Verification Code!</h2>
        <p className="text-center mb-6">
          Enter the 6-character code that we sent to <strong>{userName.data.email}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-2" onPaste={handlePaste}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Verify
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Didn't receive anything?{' '}
            <button
              type="button"
              onClick={resendOTP}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPverification;
