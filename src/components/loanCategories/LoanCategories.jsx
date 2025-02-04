import React from "react";
import LoanCategoryCard from "../loanCategoryCard/LoanCategoryCard";
import { Briefcase, Home, GraduationCap, Heart } from "lucide-react"; // Icons

const LoanCategories = () => {
  const categories = [
    {
      category: "Business Loan",
      subcategories: ["Buy Stall", "Advance Rent", "Shop Assets"],
      maxLoan: "10 Lakh",
      period: 5,
      icon: <Briefcase />,
    },
    {
      category: "Home Loan",
      subcategories: ["Structure", "Finishing", "Renovation"],
      maxLoan: "10 Lakh",
      period: 5,
      icon: <Home />,
    },
    {
      category: "Education Loan",
      subcategories: ["University Fees", "School Fees"],
      maxLoan: "As Required",
      period: 4,
      icon: <GraduationCap />,
    },
    {
      category: "Wedding Loan",
      subcategories: ["Valima", "Furniture", "Jahez"],
      maxLoan: "5 Lakh",
      period: 3,
      icon: <Heart />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((item, index) => (
        <LoanCategoryCard key={index} {...item} />
      ))}
    </div>

    
    
  );
};

export default LoanCategories;
