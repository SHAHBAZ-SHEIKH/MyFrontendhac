import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/forgotpassword', { email }, { withCredentials: true });
      setSuccessMessage('Password reset link sent successfully. Please check your email.');
      setErrorMessage('');
      setEmail('');
      toast.success('Password reset link sent successfully. Please check your email.');
      setTimeout(() => {
        navigate('/verify-email');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
      setSuccessMessage('');
      toast.error(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Forgot Password</h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your registered email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full px-4 py-2 border border-gray-500 dark:border-gray-600 rounded-md  dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8dc63f]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
          {/* Success Message */}
          {successMessage && <p className="text-green-400 text-sm">{successMessage}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#8dc63f] text-white font-semibold rounded-md hover:bg-green-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-center items-center"
            >
              Send Email
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Remembered your password?{' '}
            <Link to="/login" className="text-[#8dc63f] hover:text-green-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
