import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveLoanRequestForm } from "../../redux/loanRequestFormSlice";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function LoanRequestForm() {
  const loanDetails = useSelector((state) => state.saveLoanDetails.loanDetails);
  const userName = useSelector((state) => state.user.currentUser)
  // console.log(userName.data._id)
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const userId = userName?.data?._id; // Replace with actual userId from Redux or Auth context
  // console.log(userId)

  const dispatch = useDispatch();

  const [guarantee1, setGuarantee1] = useState({
    name: "",
    email: "",
    cnic: "",
    location: "",
    phone: "",
  });

  const [guarantee2, setGuarantee2] = useState({
    name: "",
    email: "",
    cnic: "",
    location: "",
    phone: "",
  });

  const [userInfo, setUserInfo] = useState({
    address: "",
    phone: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();


  const generatePDF = (loanData) => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Loan Request Confirmation", 70, 15);
      const appointmentDate = loanData.data.appointment.appointmentDate
        ? new Date(loanData.data.appointment.appointmentDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        })
        : "N/A";

      doc.setFontSize(12);
      doc.text(`Loan ID: ${loanData.data.loan._id || "N/A"}`, 15, 30);
      doc.text(`User ID: ${loanData.data.loan.userId || "N/A"}`, 15, 40);
      doc.text(`Loan Amount: PKR ${loanData.data.loan.loanAmount || "N/A"}`, 15, 50);
      doc.text(`Loan Duration: ${loanData.data.loan.loanDuration || "N/A"} years`, 15, 60);
      doc.text(`Category: ${loanData.data.loan.loanCategory || "N/A"}`, 15, 70);
      doc.text(`Subcategory: ${loanData.data.loan.loanSubCategory || "N/A"}`, 15, 80);
      doc.text(`Status: ${loanData.data.loan.loanStatus || "N/A"}`, 15, 90);
      doc.text(`Appointment Date: ${appointmentDate}`, 15, 100);
      doc.text(`Appointment Time: ${loanData.data.appointment.time || "N/A"}`, 15, 110);
      doc.text(`Appointment Office: ${loanData.data.appointment.office || "N/A"}`, 15, 120);

      doc.autoTable({
        startY: 130,
        head: [["Guarantee", "Name", "Email", "CNIC", "Location", "Phone"]],
        body: [
          ["Guarantee 1", guarantee1.name, guarantee1.email, guarantee1.cnic, guarantee1.location, guarantee1.phone],
          ["Guarantee 2", guarantee2.name, guarantee2.email, guarantee2.cnic, guarantee2.location, guarantee2.phone],
        ],
      });

      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Field", "Value"]],
        body: [
          ["Address", userInfo.address],
          ["Phone", userInfo.phone],
          ["City", userInfo.city],
          ["Country", userInfo.country],
        ],
      });

      doc.save("Loan_Request_Details.pdf");
      console.log("PDF generated successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      userId: userId,
      loanAmount: loanDetails.loanAmount,
      loanDuration: loanDetails.tenure,
      loanCategory: loanDetails.category,
      loanSubCategory: loanDetails.subcategory,
      depositAmount: loanDetails.initialDeposit,
      witness: [guarantee1, guarantee2],
      address: userInfo.address,
      phone: userInfo.phone,
      city: userInfo.city,
      country: userInfo.country,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/loan/loanrequest", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Loan request submitted successfully!");
      console.log(response.data.data);
      dispatch(saveLoanRequestForm(response.data.data));

      console.log("Loan Request Successful:", response.data);
      // **Generate PDF after successful submission**
      generatePDF(response.data);
      setTimeout(() => {

        navigate("/user/dashboard");
      }, 3000)
      // Change route to a success page if needed
    } catch (error) {
      console.error("Error submitting loan request:", error);
      toast.error("Failed to submit loan request. Please try again.");

    }
  };

  return (
    <>

      <Navbar />
      <ToastContainer />
      <div
        className={`${isDarkMode ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
          } flex justify-center items-center min-h-screen px-4 py-10`}
      >
        <div
          className={`w-full max-w-4xl p-8 rounded-lg shadow-lg mt-10 space-y-6 ${isDarkMode ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
        >
          <h2 className="text-3xl font-bold text-center text-[#0d6db7]">Loan Request Form</h2>
          <div className="border-l-4 border-[#8dc63f] pl-4">
            <h3 className="text-lg font-semibold mb-2">Loan Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p><strong>Category:</strong> <span className="text-[#0d6db7]">{loanDetails.category}</span></p>
              <p><strong>Subcategory:</strong> <span className="text-[#0d6db7]">{loanDetails.subcategory}</span></p>
              <p><strong>Loan Amount:</strong> <span className="text-[#8dc63f]">PKR {loanDetails.loanAmount}</span></p>
              <p><strong>Initial Deposit:</strong> <span className="text-[#8dc63f]">PKR {loanDetails.initialDeposit}</span></p>
              <p><strong>Tenure:</strong> <span className="text-[#0d6db7]">{loanDetails.tenure} years</span></p>
            </div>
          </div>

          <h3 className="text-lg font-semibold">Guarantee Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[guarantee1, guarantee2].map((guarantee, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <h4 className="text-md font-semibold">Guarantee {index + 1}</h4>
                {Object.keys(guarantee).map((key) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={guarantee[key]}
                    onChange={(e) =>
                      index === 0
                        ? setGuarantee1({ ...guarantee1, [key]: e.target.value })
                        : setGuarantee2({ ...guarantee2, [key]: e.target.value })
                    }
                    className="w-full p-3 border border-[#8dc63f] focus:border-[#0d6db7] focus:outline-none rounded-lg"
                  />
                ))}
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="space-y-4">
            {Object.keys(userInfo).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={userInfo[key]}
                onChange={(e) => setUserInfo({ ...userInfo, [key]: e.target.value })}
                className="w-full p-3 border border-[#8dc63f] focus:border-[#0d6db7] focus:outline-none rounded-lg"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#8dc63f] text-white rounded-lg hover:bg-[#0a5c3d] transition"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
