import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../public/Navbar/Navbar";
import { FaBars, FaTimes } from "react-icons/fa";
import Footer from "./Footer";

const Service = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "https://factoryseghar-backend.onrender.com/api/getAllOrders"
        );
        console.log(
          "response",
          JSON.stringify(response?.data?.orders, null, 2)
        );
        setOrders(response.data?.orders); // Assuming response is an array of orders
        setIsLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false); // Stop loading on error
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    <div className="flex h-screen">
      {/* Navbar Component */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Main Content - 80% Width */}
      <div className="w-4/5 ml-auto flex flex-col items-center justify-start text-center p-10">
        {/* Toggle Menu Button */}
        <button
          className="absolute top-4 left-4 text-3xl z-20 bg-yellow-500 p-2 rounded"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Orders Dashboard Header */}
        <h1 className="text-3xl font-bold mt-10 mb-6">Orders Dashboard</h1>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-xl text-gray-700">Loading...</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border border-gray-400 px-4 py-2">Order ID</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Customer Name
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Product</th>
                  <th className="border border-gray-400 px-4 py-2">Quantity</th>
                  <th className="border border-gray-400 px-4 py-2">Price</th>
                  <th className="border border-gray-400 px-4 py-2">Total Amount</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <React.Fragment key={order._id || "dummy-id"}>
                      {order.items.map((item, index) => (
                        <tr
                          key={`${order._id}-${index}`}
                          className="hover:bg-gray-200"
                        >
                          <td className="border border-gray-400 px-4 py-2">
                            {order.orderId || "ORD-XXXX"}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {order.customerName || "John Doe"}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {item.productName || "Sample Product"}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {item.quantity || 1}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {item.price ? `₹${item.price}` : "$0.00"}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {order.totalAmount ? `₹${order.totalAmount}` : "$0.00"}
                          </td>
                          <td className="border border-gray-400 px-4 py-2">
                            {order.paymentStatus || "Pending"}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="border border-gray-400 px-4 py-2 text-center"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    <Footer/></>
  );
};

export default Service;
