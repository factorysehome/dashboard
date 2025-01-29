import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ isMenuOpen, toggleMenu }) => {
  const navigate = useNavigate();

  // Logout handler to clear localStorage and redirect to login
  const handleLogout = () => {
    // Remove user info from localStorage
    localStorage.removeItem("loggedInUser");
    
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-full w-1/5 bg-gray-800 text-white shadow-md transition-transform duration-300 ease-in-out z-10 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-start space-y-4 p-6 mt-12 flex-grow">
        <Link to="/addproducts" className="hover:underline">
          Add Products
        </Link>
        <Link to="/viewproduct" className="hover:underline">
          View Products
        </Link>
        <Link to="/orderinfo" className="hover:underline">
          Order History
        </Link>
      </div>

      {/* Logout Button at the bottom */}
      <div className="mb-6 mx-6 mt-[650px]">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 p-2 rounded hover:bg-red-700 "
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
