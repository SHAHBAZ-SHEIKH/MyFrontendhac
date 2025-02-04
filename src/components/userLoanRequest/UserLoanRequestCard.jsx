import React from "react";

const UserLoanRequestCard = ({ loan }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
      <h3 className="text-lg font-semibold text-blue-600">{loan.category}</h3>
      <p className="text-gray-500">{loan.subcategory}</p>
      <p className="text-gray-700">
        <strong>Initial Amount:</strong> {loan.initialAmount}
      </p>
      <p className="text-gray-700">
        <strong>Desired Amount:</strong> {loan.desiredAmount}
      </p>
      <p
        className={`text-sm font-bold mt-2 ${
          loan.status === "Approved" ? "text-green-600" : "text-yellow-500"
        }`}
      >
        {loan.status}
      </p>
    </div>
  );
};

export default UserLoanRequestCard;
