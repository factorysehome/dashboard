import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <div className="flex h-screen">
      {/* Navbar - 20% Width */}
      <nav
        className={`fixed top-0 left-0 h-full w-1/5 bg-gray-800 text-white shadow-md transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-start space-y-4 p-6 mt-12">
          <Link to="/addproducts" className="hover:underline">
                      Add Products
                    </Link>
                    <Link to="/viewproduct" className="hover:underline">
                      View Products
                    </Link>
          <Link to="/about" className="hover:underline">
            ABOUT
          </Link>
          <Link to="/service" className="hover:underline">
            SERVICES
          </Link>
          <Link to="/portfolio" className="hover:underline">
            PORTFOLIO
          </Link>
          <Link to="/contact" className="hover:underline">
            CONTACT
          </Link>
        </div>
      </nav>

      {/* Main Content - 80% Width */}
      <div className="w-4/5 ml-auto flex flex-col items-center justify-center text-center p-10">
        <button
          className="absolute top-4 left-4 text-3xl z-20 bg-yellow-500 p-2 rounded"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="text-3xl font-bold">Main Content</h1>
        <p className="mt-4">This is the main content area.</p>
      </div>
    </div>
    </>
  );
};

export default Contact;
