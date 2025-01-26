import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signupSuccess, signupFailure, signupStart } from "@/redux/userSlice";

const ShowPopup = ({ onClose }) => {
  const [Cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (Cnic && email) {
      try {
        const response = await axios.post("https://myhackathonbackend-production.up.railway.app/api/user/signup", {
          Cnic,
          email,
        });
        console.log(response.data);
        toast.success(response.data.message || "User registered successfully!");
        alert(response.data.message);
        dispatch(signupSuccess(response.data)); 
        localStorage.setItem('UserToken', response.data.token);
        onClose();
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred.");
          dispatch(signupFailure());
        } else {
          toast.error("Unable to connect to the server.");
        }
      }
    } else {
      toast.error("Please provide both CNIC and email.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-blue-600 mb-4">Proceed to Application</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">CNIC</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your CNIC"
            value={Cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPopup;