import React, { useState } from "react";
import UserNavbar from "../UserNavbar/UserNavbar";
import UserSidebar from "../UserSidebar/UserSidebar";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const GuaranteePopup = ({ onClose }) => {
    const [guarantees, setGuarantees] = useState([
      { name: "", email: "", location: "", cnic: "", phone: "" },
      { name: "", email: "", location: "", cnic: "", phone: "" }
    ]);
  
    const handleChange = (index, field, value) => {
      const updatedGuarantees = [...guarantees];
      updatedGuarantees[index][field] = value;
      setGuarantees(updatedGuarantees);
    };
  
    const handleSubmit = () => {
      if (guarantees.every(g => g.name && g.email && g.location && g.cnic && g.phone)) {
        toast.success("Guarantee details submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        onClose();
      } else {
        toast.error("Please fill out all guarantee details.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl overflow-y-auto max-h-[60vh]">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Guarantee Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="mb-4 border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Guarantee {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter name"
                    value={guarantee.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter email"
                    value={guarantee.email}
                    onChange={(e) => handleChange(index, "email", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter location"
                    value={guarantee.location}
                    onChange={(e) => handleChange(index, "location", e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-semibold mb-1">CNIC</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter CNIC"
                    value={guarantee.cnic}
                    onChange={(e) => handleChange(index, "cnic", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter phone number"
                    value={guarantee.phone}
                    onChange={(e) => handleChange(index, "phone", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2 mt-4">
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
  


  export default GuaranteePopup