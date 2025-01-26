const Navbar = () => {
    return (
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <a href="#" className="text-2xl font-bold py-4">Saylani Microfinance</a>
              <div className="hidden md:flex items-center space-x-1">
                <a href="#categories" className="py-4 px-2 hover:bg-blue-700 rounded">Loan Categories</a>
                <a href="#calculator" className="py-4 px-2 hover:bg-blue-700 rounded">Calculator</a>
                <a href="#contact" className="py-4 px-2 hover:bg-blue-700 rounded">Contact Us</a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#apply" className="py-2 px-4 bg-white text-blue-600 font-semibold rounded hover:bg-gray-200">Apply Now</a>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  