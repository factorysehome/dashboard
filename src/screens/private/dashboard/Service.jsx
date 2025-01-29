import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Service = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]); // State to store orders

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("https://factoryseghar-backend.onrender.com/api/getAllOrders");
        setOrders(response.data); // Assuming response.data contains the orders array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
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
        <h1 className="text-3xl font-bold mb-4">Orders Dashboard</h1>

        {/* Orders Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-400 px-4 py-2">Order ID</th>
                <th className="border border-gray-400 px-4 py-2">Customer Name</th>
                <th className="border border-gray-400 px-4 py-2">Product</th>
                <th className="border border-gray-400 px-4 py-2">Quantity</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-200">
                    <td className="border border-gray-400 px-4 py-2">{order._id}</td>
                    <td className="border border-gray-400 px-4 py-2">{order.customerName}</td>
                    <td className="border border-gray-400 px-4 py-2">{order.productName}</td>
                    <td className="border border-gray-400 px-4 py-2">{order.quantity}</td>
                    <td className="border border-gray-400 px-4 py-2">{order.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border border-gray-400 px-4 py-2 text-center">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Service;
