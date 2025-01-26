import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoanRequestCard from "../LoanRequestCard/LoanRequestCard";
import UserNavbar from "../UserNavbar/UserNavbar";
import UserSidebar from "../UserSidebar/UserSidebar";
import GuaranteePopup from "../GuaranteePopup/GuaranteePopup";

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSelector((state) => state.user.currentUser.data); // Get the logged-in user from Redux

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get("https://myhackathonbackend-production.up.railway.app/api/loan");
        console.log(response.data);
        const userLoans = response.data.filter((loan) => loan.userId === user._id); 
        console.log(userLoans);
        // Filter loans for the current user
        setLoanRequests(userLoans);
      } catch (error) {
        console.error("Error fetching loan requests:", error);
      }
    };

    fetchLoanRequests();
  }, []);

  const handleAccept = () => {
    setShowPopup(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-dashboard-container">
      {/* Navbar */}
      <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar and Main Content */}
      <div className="admin-dashboard-content">
        <UserSidebar isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className={`admin-main-content ${isSidebarOpen ? "" : "expanded"}`}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <h2 className="text-2xl font-bold mb-4 col-span-full">Loan Requests</h2>
            {loanRequests.map((request, index) => (
              <LoanRequestCard key={index} loanRequest={request} onAccept={handleAccept} />
            ))}
            {showPopup && <GuaranteePopup onClose={() => setShowPopup(false)} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoanRequests;
