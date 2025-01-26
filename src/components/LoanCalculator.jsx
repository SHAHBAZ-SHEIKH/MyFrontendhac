import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const LoanCalculator = () => {
  const [category, setCategory] = useState("wedding");
  const [subcategory, setSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [desiredLoan, setDesiredLoan] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");
  const [remainingLoan, setRemainingLoan] = useState(null);
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = useSelector((state)=>state.user.currentUser.data._id);
  console.log(userId);

  const categories = {
    wedding: { maxLoan: 500000, maxYears: 3, subcategories: ["Valima", "Furniture", "Food", "Jahez"] },
    home: { maxLoan: 1000000, maxYears: 5, subcategories: ["Structure", "Finishing"] },
    business: { maxLoan: 1000000, maxYears: 5, subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"] },
    education: { maxLoan: Infinity, maxYears: 4, subcategories: ["University Fees", "Child Fees"] },
  };

  const calculateLoan = () => {
    if (!initialDeposit || !desiredLoan || !loanPeriod || !category || !subcategory) {
      setErrorMessage("Please fill all the fields correctly.");
      return;
    }

    const selectedCategory = categories[category];
    const remaining = parseFloat(desiredLoan) - parseFloat(initialDeposit);

    if (remaining < 0) {
      setErrorMessage("Initial deposit cannot exceed the desired loan amount.");
      return;
    }

    if (remaining > selectedCategory.maxLoan) {
      setErrorMessage(`Maximum loan for this category is PKR ${selectedCategory.maxLoan}.`);
      return;
    }

    if (parseFloat(loanPeriod) > selectedCategory.maxYears) {
      setErrorMessage(`Maximum loan period for this category is ${selectedCategory.maxYears} years.`);
      return;
    }

    const monthlyInstallment = remaining / (parseFloat(loanPeriod) * 12);

    setRemainingLoan(remaining.toFixed(2));
    setMonthlyPayment(monthlyInstallment.toFixed(2));
    setErrorMessage("");
  };

  const sendDataToBackend = async () => {
    console.log(category, subcategory, initialDeposit, desiredLoan, loanPeriod);
    if (!category || !subcategory || !initialDeposit || !desiredLoan || !loanPeriod) {
      toast.error("Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/loan/loanrequest", {
        loanCategory :category,
        loanSubCategory:subcategory,
        depositAmount:initialDeposit,
        loanAmount:desiredLoan,
        loanDuration:loanPeriod,
        userId:userId
        
      });
      toast.success(response.data.message || "Loan request submitted successfully!");
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Loan Calculator</h2>
      <div className="grid gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Select Loan Category</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(""); // Reset subcategory when category changes
            }}
          >
            <option value="wedding">Wedding Loans</option>
            <option value="home">Home Construction Loans</option>
            <option value="business">Business Startup Loans</option>
            <option value="education">Education Loans</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Select Subcategory</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            disabled={!category}
          >
            <option value="">-- Select Subcategory --</option>
            {category &&
              categories[category].subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Initial Deposit (PKR)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your initial deposit"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Desired Loan Amount (PKR)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter the desired loan amount"
            value={desiredLoan}
            onChange={(e) => setDesiredLoan(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Loan Period (Years)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter the loan repayment period in years"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          onClick={calculateLoan}
        >
          Calculate Loan
        </button>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg mt-4"
          onClick={sendDataToBackend}
        >
          Submit Loan Request
        </button>

        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )}

        {remainingLoan !== null && monthlyPayment !== null && (
          <div className="mt-4 text-lg text-green-600 font-bold">
            <p>Remaining Loan Amount: PKR {remainingLoan}</p>
            <p>Monthly Payment: PKR {monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanCalculator;
