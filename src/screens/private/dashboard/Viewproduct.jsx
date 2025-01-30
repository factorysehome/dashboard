import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Navbar from "../../public/Navbar/Navbar"; 
import Footer from "./Footer";

const Viewproduct = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cache expiry time (5 minutes)
  const CACHE_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Fetch product data from the API or use cached data
  useEffect(() => {
    const fetchProducts = async () => {
      // Check if the page was reloaded
      const isPageReloaded = !sessionStorage.getItem("isPageReloaded");

      if (isPageReloaded) {
        // If the page was reloaded, clear the cache and fetch fresh data
        localStorage.removeItem("cachedProducts");
        localStorage.removeItem("cachedTimestamp");
        sessionStorage.setItem("isPageReloaded", "true"); // Mark the page as reloaded
      }

      // Check if products are cached and not expired
      const cachedProducts = localStorage.getItem("cachedProducts");
      const cachedTimestamp = localStorage.getItem("cachedTimestamp");

      if (cachedProducts && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - cachedTimestamp < CACHE_EXPIRY_TIME) {
          // Use cached data if it's within the expiry time
          setProducts(JSON.parse(cachedProducts));
          return;
        }
      }

      // If cache is expired or doesn't exist, fetch fresh data from the API
      try {
        const response = await fetch(
          "https://factoryseghar-backend.onrender.com/api/getItems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: "ALL", // Include the required category field
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        if (data.status === "success") {
          const items = data.data.items || [];
          setProducts(items); // Update state with fetched data

          // Cache the fetched data and the current timestamp
          // localStorage.setItem("cachedProducts", JSON.stringify(items));
          // localStorage.setItem("cachedTimestamp", new Date().getTime());
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to Edit Product page with product data
  const handleEdit = (product) => {
    navigate(`/editproduct/${product._id}`, { state: { product } });
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* Navbar Component */}
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Main Content - 80% Width */}
        <div className="w-4/5 ml-auto flex flex-col items-center text-center p-10">
          <button
            className="absolute top-4 left-4 text-3xl z-20 bg-yellow-500 p-2 rounded"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-3xl font-bold mb-8">Product List</h1>
          <div className="w-full">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.name || "Product Image"}
                      className="w-full h-48 object-contain mb-4 rounded cursor-pointer"
                      onClick={() => handleEdit(product)} // Navigate to Edit Product page
                    />
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.category}</p>
                    <div className="space-y-2 text-left">
                      {product.productDetail.map((detail, index) => (
                        <div key={index}>
                          <p>
                            <strong>Case Size:</strong> {detail.caseSize}
                          </p>
                          <p>
                            <strong>SKU:</strong> {detail.sku}
                          </p>
                          <p>
                            <strong>Price:</strong> ${detail.price}
                          </p>
                          {detail?.variants?.length > 0 && (
                            <p>
                              <strong>Variants:</strong>{" "}
                              {detail.variants.join(", ")}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Viewproduct;
