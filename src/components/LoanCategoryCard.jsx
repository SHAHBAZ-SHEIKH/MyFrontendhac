const LoanCategoryCard = ({ title, description, onClick }) => (
    <div 
      className="rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer bg-white p-6" 
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-blue-600 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
  export default LoanCategoryCard;