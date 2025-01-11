import React, { useState } from "react";
import C_button from "../../components/commonCom/C_button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Afterlogin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { person } = location.state || {}; 

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex">
      {/* Hamburger Menu Button */}
      {/* <button
        className="absolute top-4 left-4 text-3xl  z-20 bg-yellow-500 p-2 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button> */}

      {/* Sidebar Navigation */}
      <nav
        className={`fixed top-0 mt-[65px] left-0 h-full bg-gray-800 text-white shadow-md transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        
        <div className="flex flex-col items-start space-y-4 p-6">
          <Link to="/addproducts" className="hover:underline">
            Product
          </Link>
          <Link to="" className="hover:underline">
            ABOUT
          </Link>
          <Link to="" className="hover:underline">
            SERVICES
          </Link>
          <Link to="" className="hover:underline">
            PORTFOLIO
          </Link>
          <Link to="" className="hover:underline">
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
      <button
        className="absolute top-4 left-4 text-3xl  z-20 bg-yellow-500 p-2 rounded"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

        <p className="text-2xl md:text-4xl lg:text-6xl">
          Hello {person}, You are doing great as Saurab sir is teaching you on
          the right path.
        </p>
        <C_button
          text="Logout"
          onClick={handleLogout}
          className="mt-10 bg-yellow-500 text-black px-6 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default Afterlogin;
