import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import ShowPopup from "@/components/ShowPopup";
import Banner from "@/components/banner/Banner";
import LoanCategories from "@/components/loanCategories/LoanCategories";
import LoanCalculator from "@/components/loanCalculator/LoanCalculator";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.darkMode); // Redux Theme State

  return (
    <div className={`${isDarkMode ?"bg-white text-black": "bg-gray-900 text-white"} min-h-screen py-12 transition-all duration-300`}>
      <Navbar />
      <Banner />
      <LoanCategories/>
      <LoanCalculator/>
      
      {showPopup && <ShowPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Home;
