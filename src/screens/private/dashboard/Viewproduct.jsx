import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Viewproduct = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
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
          setProducts(data.data.items); // Store the fetched products in state
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to Edit Product page with product ID
  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`); // Pass product ID in the URL
  };

  return (
    <>
      <div className="flex min-h-screen">
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
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded cursor-pointer"
                      onClick={() => handleEdit(product._id)} // Navigate to Edit Product page
                    />
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.category}</p>
                    <div className="space-y-2">
                      {product.productDetail.map((detail, index) => (
                        <div key={index} className="text-left">
                          <p>
                            <strong>Case Size:</strong> {detail.caseSize}
                          </p>
                          <p>
                            <strong>SKU:</strong> {detail.sku}
                          </p>
                          <p>
                            <strong>Price:</strong> {detail.price}
                          </p>
                          {detail.variants.length > 0 && (
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
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewproduct;