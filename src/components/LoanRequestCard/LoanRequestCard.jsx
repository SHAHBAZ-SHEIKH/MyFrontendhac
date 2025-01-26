import React from 'react';

const LoanRequestCard = ({ loanRequest, onAccept }) => (
  console.log(loanRequest),
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
      <h3 className="text-xl font-bold text-blue-600 mb-4">Loan Request</h3>
      <p className="text-gray-700 mb-2"><strong>Loan Type:</strong> {loanRequest.loanCategory}</p>
      <p className="text-gray-700 mb-2"><strong>Amount:</strong> PKR {loanRequest.loanAmount}</p>
      <p className="text-gray-700 mb-4"><strong>Duration:</strong> {loanRequest.loanDuration} years</p>
      <button
        className="block w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700"
        onClick={onAccept}
      >
        Accept
      </button>
    </div>
  );

export default LoanRequestCard;