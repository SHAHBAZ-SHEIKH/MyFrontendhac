// UserSidebar.jsx
import React from "react";
import {logout} from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(logout())
    navigate("/")
    
  }

  return (
    <div className="bg-gray-800 text-white w-64 p-6 fixed top-0 left-0 h-full lg:block z-40">
      {/* Sidebar content */}
      <ul>
        <li className="mb-4 mt-16">
          <button className="bg-blue-600 text-white p-2 rounded-md w-full">
            Loan Requests
          </button>
        </li>
        <li>
          <button onClick={handleLogout} className="bg-red-600 text-white p-2 rounded-md w-full">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
