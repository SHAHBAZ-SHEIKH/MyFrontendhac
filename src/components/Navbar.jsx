import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const Navbar = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className={`shadow-md fixed w-full top-0 z-50 transition-all duration-300 
      ${isDarkMode ? "bg-[#eee]" : "bg-gray-700"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-[#8dc63f] text-2xl font-bold">
              Saylani Microfinance
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="text-[#8dc63f] hover:text-gray-300 mx-4"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {/* Mobile Menu Button */}
          {/* <div className="md:hidden flex items-center">
            <button className="text-orange-500">
              <Menu size={28} />
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
