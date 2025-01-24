import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const EditProduct = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Extract product ID from the URL
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  
  useEffect(() => {
    if (location.state?.product) {
      setProduct(location.state.product);
    }
  }, [location.state]);

 
  const handleChange = (e, detailIndex) => {
    const { name, value } = e.target;

    if (name.startsWith("productDetail")) {
     
      const field = name.split(".")[1];
      setProduct((prevProduct) => {
        const updatedDetails = [...prevProduct.productDetail];
        updatedDetails[detailIndex][field] = value;
        return {
          ...prevProduct,
          productDetail: updatedDetails,
        };
      });
    } else {
     
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  // Navigate to Edit Product page with product ID and product data
  const handleEdit = (product) => {
    navigate(`/editproduct/${product._id}`, { state: { product } }); // Pass product data in the state
  };

  if (!product) {
    return <p>Loading...</p>;
  }

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
          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
          <form className="w-full max-w-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            {product.productDetail.map((detail, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold">Product Detail {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-gray-700">Case Size</label>
                  <input
                    type="text"
                    name={`productDetail.${index}.caseSize`}
                    value={detail.caseSize}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">SKU</label>
                  <input
                    type="text"
                    name={`productDetail.${index}.sku`}
                    value={detail.sku}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="text"
                    name={`productDetail.${index}.price`}
                    value={detail.price}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700">Variants</label>
                  <input
                    type="text"
                    name={`productDetail.${index}.variants`}
                    value={detail.variants.join(", ")}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => navigate("/viewproduct")} // Navigate back to View Product page
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;