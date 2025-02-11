import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveLoanDetails } from "../../redux/loanRequestSlice";
import ShowPopup from "../ShowPopup";
import { toast,ToastContainer } from "react-toastify";

const loanCategories = {
  "Wedding Loans": {
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxAmount: 500000,
    minTenure: 1,
    maxTenure: 3,
  },
  "Home Construction Loans": {
    subcategories: ["Structure", "Finishing", "Loan"],
    maxAmount: 1000000,
    minTenure: 1,
    maxTenure: 5,
  },
  "Business Startup Loans": {
    subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
    maxAmount: 1000000,
    minTenure: 1,
    maxTenure: 5,
  },
  "Education Loans": {
    subcategories: ["University Fees", "Child Fees Loan"],
    maxAmount: 500000,
    minTenure: 1,
    maxTenure: 4,
  },
};

export default function LoanCalculator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoanCalculated, setIsLoanCalculated] = useState(false);

  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const isAuthenticated = useSelector((state) => state.user.currentUser);
  const isSaveLoanDetails = useSelector((state) => state.saveLoanDetails.loanDetails);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory("");
    setLoanAmount(0);
    setInitialDeposit(0);
    setTenure(loanCategories[selectedCategory]?.minTenure || 0);
    setMonthlyInstallment(null);
    setIsLoanCalculated(false);
  };

  const handleCalculate = () => {
    if (!category || !subcategory || !loanAmount || !initialDeposit || !tenure) {
      toast.error("Please complete all fields before calculating");
      return;
    }
    const remainingLoan = loanAmount - initialDeposit;
    const tenureMonths = tenure * 12;
    const monthlyPayment = remainingLoan / tenureMonths;
    setMonthlyInstallment(monthlyPayment.toFixed(2));
    setIsLoanCalculated(true);
  };
  const handleProceed = () => {
    if (!isLoanCalculated) {
      toast.error("Please calculate the loan before proceeding");
      return;
    }
    dispatch(saveLoanDetails({ category, subcategory, loanAmount, initialDeposit, tenure }));
    if (isAuthenticated) {
      navigate("/loanRequestForm");
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className={`p-4 max-w-md mx-auto rounded-lg shadow-lg border 
        ${isDarkMode ? "bg-white text-black": "bg-gray-900 text-white"} 
        flex flex-col transition-all duration-300`}
    >
      <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>
      <label>Category:</label>
      <select value={category} onChange={handleCategoryChange} className="text-gray-900 w-full p-2 border mb-2">
        <option value="">Select Category</option>
        {Object.keys(loanCategories).map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label>Subcategory:</label>
      <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} className="text-gray-900 w-full p-2 border mb-2">
        <option value="">Select Subcategory</option>
        {category && loanCategories[category].subcategories.map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>

      <label>Loan Amount:</label>
      <select value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="text-gray-900 w-full p-2 border mb-2">
        <option value={0}>Select Amount</option>
        {category && [...Array(loanCategories[category].maxAmount / 50000)].map((_, i) => (
          <option key={i} value={(i + 1) * 50000}>{(i + 1) * 50000}</option>
        ))}
      </select>

      <label>Initial Deposit:</label>
      <select value={initialDeposit} onChange={(e) => setInitialDeposit(Number(e.target.value))} className="text-gray-900 w-full p-2 border mb-2">
        <option value={0}>Select Initial Deposit</option>
        {loanAmount > 0 && [...Array(loanAmount / 50000)].map((_, i) => (
          <option key={i} value={(i + 1) * 50000}>{(i + 1) * 50000}</option>
        ))}
      </select>

      <label>Tenure (Years):</label>
      <select value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="text-gray-900 w-full p-2 border mb-2">
        <option value={0}>Select Tenure</option>
        {category && [...Array(loanCategories[category].maxTenure - loanCategories[category].minTenure + 1)].map((_, i) => (
          <option key={i} value={loanCategories[category].minTenure + i}>{loanCategories[category].minTenure + i}</option>
        ))}
      </select>

      <button onClick={handleCalculate} className="w-full p-2 bg-[#0d6efd] text-white mt-2">Calculate</button>
      {monthlyInstallment !== null && (
        <p className="mt-4 text-lg font-bold">Monthly Installment: PKR {monthlyInstallment}</p>
      )}

      <button onClick={handleProceed} disabled={!isLoanCalculated} className="w-full p-2 bg-[#8dc63f] text-white mt-2">Now Proceed</button>
      {showPopup && <ShowPopup message="Please login to proceed" onClose={() => setShowPopup(false)} />}
    </div>
    </>
  );
}
