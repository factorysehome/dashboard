import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Address</h3>
            <p className="text-gray-400">
              123 Main Street,<br />
              City, State, ZIP Code<br />
              Country
            </p>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/contact" className="hover:text-white transition-colors">
                  Email: factorysehome@gmail.com
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-white transition-colors">
                  Phone: +97111 42844
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Live Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms and Conditions Section */}
          <div>
            <Link to="/termsandcondition" className="text-xl font-bold mb-4">Terms & Conditions</Link >
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/terms" className="hover:text-white transition-colors">
                  User Agreement
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="hover:text-white transition-colors">
                  Payment Terms
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy Policy Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Privacy Policy</h3>
            <ul className="text-gray-400">
              <li className="mb-2">
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Data Collection
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  GDPR Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Social Media Icons */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center">
          {/* Copyright Text */}
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Factory Se Ghar. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Link 
              to="https://www.facebook.com/goodandmooreofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaFacebook size={24} />
            </Link >
            <Link 
              to="https://www.instagram.com/goodandmooreofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </Link >
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;