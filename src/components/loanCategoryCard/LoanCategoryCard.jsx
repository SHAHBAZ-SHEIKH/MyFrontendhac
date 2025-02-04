import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LoanCategoryCard = ({ category, subcategories, maxLoan, period, icon }) => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-lg shadow-lg border 
        ${isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"}
        flex flex-col items-center text-center transition-all duration-300`}
    >
      {/* Icon */}
      <div className={`${isDarkMode ? "text-[#8dc63f]" :"text-orange-500"} text-5xl`}>{icon}</div>

      {/* Category Name */}
      <h2 className="text-2xl font-bold mt-4">{category}</h2>

      {/* Subcategories */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {subcategories.join(", ")}
      </p>

      {/* Loan Info */}
      <div className="mt-4">
        <p className="text-lg font-semibold">Max Loan: <span className={`${isDarkMode ? "text-[#8dc63f]" :"text-orange-500"} `}>PKR {maxLoan}</span></p>
        <p className="text-lg font-semibold">Period: <span className={`${isDarkMode ? "text-[#8dc63f]" :"text-orange-500"}`}>{period} years</span></p>
      </div>

      
    </motion.div>
  );
};

export default LoanCategoryCard;
