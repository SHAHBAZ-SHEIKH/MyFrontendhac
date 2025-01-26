import React, { useState } from "react";
import LoanCategoryCard from "../../components/LoanCategoryCard";
import LoanCalculator from "../../components/LoanCalculator";
import Navbar from "../../components/Navbar";
import ShowPopup from "@/components/ShowPopup";

const LandingPage = () => {
    const [showPopup, setShowPopup] = useState(false);
  const loanCategories = [
    {
      title: "Wedding Loans",
      description: "Loans for Valima, Furniture, Food, and Jahez. Maximum PKR 5 Lakh with a 3-year period."
    },
    {
      title: "Home Construction Loans",
      description: "Loans for structure and finishing. Maximum PKR 10 Lakh with a 5-year period."
    },
    {
      title: "Business Startup Loans",
      description: "Loans for shop rent, assets, and machinery. Maximum PKR 10 Lakh with a 5-year period."
    },
    {
      title: "Education Loans",
      description: "Loans for university and child education fees. Flexible amount with a 4-year period."
    }
  ];

  const handleProceed = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
        <Navbar />
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-600">Saylani Microfinance</h1>
        <p className="text-xl text-gray-600 mt-4">Empowering you with Qarze Hasana loans</p>
      </header>
      <section className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {loanCategories.map((category, index) => (
          <LoanCategoryCard
            key={index}
            title={category.title}
            description={category.description}
            onClick={() => alert(`Selected: ${category.title}`)}
          />
        ))}
      </section>
      <LoanCalculator />
      <footer className="text-center mt-16">
        <button 
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg"
          onClick={handleProceed}
        >
          Proceed to Application
        </button>
      </footer>
      {showPopup && <ShowPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default LandingPage;