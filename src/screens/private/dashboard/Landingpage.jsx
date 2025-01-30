import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";


const Landingpage = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Factory se ghar</h1>
          
          {/* Links */}
          <div className="space-x-6">
             <Link
                              to={{
                                pathname: "/footerinfo",
                                search: "?page=about",
                              }}
                              className="hover:text-white transition-colors"
                            >
                              About us
                            </Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center h-screen bg-red-500">
        <p className="text-white text-5xl">comming soon....</p>
      </div>
      <Footer/>
    </>
  );
};

export default Landingpage;
