import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Banner = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <section className={`py-20 px-6 transition-all duration-300 
      ${isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Side (Text) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className={`text-3xl md:text-6xl font-bold ${isDarkMode? "text-black" : "text-orange-500"} `}>
          Welcome to the <span className={`${isDarkMode? "text-[#8dc63f]" : "text-gray-500"}`}>Saylani Welfare </span>
           Non Governmental Organization in Pakistan
          </h1>
          <p className="mt-4 text-lg text-gray-300 dark:text-gray-800">
            Apply for an interest-free loan today and achieve your financial goals.
          </p>
          <Link to="/apply">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className={`mt-6 ${isDarkMode? "bg-[#8dc63f]":"bg-orange-500"} hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md`}
            >
              Apply Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Side (Image) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 flex justify-center mt-6 md:mt-0"
        >
          <img
            src="https://res.cloudinary.com/saylani-welfare/image/upload/v1646926708/website-images/static/38.png"
            alt="Microfinance Loan"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
      
    </section>
  );
};

export default Banner;
