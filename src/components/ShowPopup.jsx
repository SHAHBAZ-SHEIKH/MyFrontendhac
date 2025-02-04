import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupSuccess } from "@/redux/userSlice";
import { loginSuccess, loginFailure, loginStart } from "@/redux/userSlice";

const ShowPopup = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const validateCnic = (cnic) => /^\d{5}-\d{7}-\d{1}$/.test(cnic);

  const handleSignup = async () => {
    console.log(cnic, email, name);
    if (!cnic || !email || !name) {
      toast.error("Please fill all fields.");
      return;
    }

    if (!validateCnic(cnic)) {
      toast.error("Invalid CNIC format.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user/signup", {
        cnic,
        email,
        name,
      });
      dispatch(signupSuccess(response.data))

      toast.success(response.data.message);
      localStorage.setItem('UserToken', response.data.token);
      
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    dispatch(loginStart());

    try {
      const response = await axios.post("http://localhost:5000/api/user/login",{ email, password },
        { withCredentials: true });

      toast.success("Login successful!");
      localStorage.setItem('UserToken', (response?.data?.token));
      
            setTimeout(()=>{
              dispatch(loginSuccess(response.data)); // Set user data
              navigate("/loanRequestForm")
            },4000)
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {showLogin ? (
            // ======= LOGIN FORM =======
            <>
              <h2 className="text-xl font-bold text-blue-600 mb-4">Login</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 text-[#333]  border-[#8dc63f]  focus:border-[#0d6db7] focus:outline-none border rounded-lg"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full p-2 text-[#333] border border-[#8dc63f] focus:border-[#0d6db7] focus:outline-none rounded-lg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 bg-[#0d6efd] text-white rounded-lg hover:bg-gray-400" onClick={onClose}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#8dc63f] text-white rounded-lg hover:bg-blue-700" onClick={handleLogin}>
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-black">
                  Don't have an account?{" "}
                  <button className="px-4 py-2 bg-[#0d6efd] text-white rounded-lg hover:bg-gray-400" onClick={() => setShowLogin(false)}>
                    Sign Up
                  </button>
                </span>
              </div>
            </>
          ) : (
            // ======= SIGNUP FORM =======
            <>
              <h2 className="text-xl font-bold text-blue-600 mb-4">Proceed to Application</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">CNIC</label>
                <input
                  type="text"
                  className="w-full p-2 text-[#333] border border-[#8dc63f] rounded-lg focus:border-[#0d6db7] focus:outline-none"
                  placeholder="Enter your CNIC"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 text-[#333] border border-[#8dc63f] rounded-lg focus:border-[#0d6db7] focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 text-[#333] border border-[#8dc63f] rounded-lg focus:border-[#0d6db7] focus:outline-none"
                  placeholder="Enter your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 text-white bg-[#0d6efd] rounded-lg hover:bg-gray-400" onClick={onClose}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#8dc63f] text-white rounded-lg hover:bg-blue-700" onClick={handleSignup}>
                  Submit
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className="text-black">
                  Already have an account?{" "}
                  <button className="px-4 py-2 bg-[#0d6efd] text-white rounded-lg hover:bg-gray-400" onClick={() => setShowLogin(true)}>
                    Login
                  </button>
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowPopup;
