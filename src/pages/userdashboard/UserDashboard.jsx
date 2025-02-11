import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import UserLoanRequestCard from "@/components/userLoanRequest/UserLoanRequestCard";
import axios from "axios";
import UserSidebar from "@/components/userSidebar/UserSidebar";
import UserNavbar from "@/components/userNavbar/UserNavbar";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loanData,setLoanData] = useState([])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  // Fetching userId from the Redux store (assuming it's stored in state.user)
  const userId = useSelector(state => state.user.currentUser?.data?._id); // Adjust based on your Redux state
  console.log("userId", userId);

  // Fetching loan requests from the Redux store (assuming it's stored in state.loans)
  // const loanRequests = useSelector(state => state.saveLoanRequestForm.loanRequestForm);
  // console.log("loanRequests", loanRequests);

  useEffect(()=>{
    const fetchLoanRequests = async () => {
      try{
        const response = await axios.get("http://localhost:5000/api/loan")
        console.log(response.data)
        setLoanData(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchLoanRequests();
  },[])

  

  // Filtering the loan requests based on the logged-in userId
  const userLoanRequests = loanData.filter(loan => loan.userId === userId);
  console.log("userLoanRequests", userLoanRequests);

  
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar (Hidden on Mobile) */}
      <div
        className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} bg-gray-800 text-white w-64 p-6 fixed top-0 left-0 h-full`}
      >
        <UserSidebar />
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-6 ${isSidebarOpen ? 'ml-64' : ''} lg:ml-64`}>
        <div className="mt-14">
          {userLoanRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userLoanRequests.map((loan, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-600">{loan.loanCategory}</h3>
                  <p className="text-gray-500">{loan.loanSubCategory}</p>
                  <p className="text-gray-700"><strong>Deposit Amount:</strong> {loan.depositAmount}</p>
                  <p className="text-gray-700"><strong>Required Amount:</strong> {loan.loanAmount}</p>
                  <button className={`text-sm font-bold mt-2 ${loan.loanStatus === "Approved" ? "text-green-600" : "text-yellow-500"}`}>
                    {loan.loanStatus}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xl text-gray-700">You have not made any loan requests yet.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
