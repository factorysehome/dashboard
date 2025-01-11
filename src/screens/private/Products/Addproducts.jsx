import React, { useState } from "react";
import axios from "axios";

const Addproducts = () => {
  const [formData, setFormData] = useState({
    category: "",
    variants: [],
    productName: "",
    productImage: null,
    sku: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Categories with keys and labels
  const categories = [
    { key: "pooja_range", label: "Pooja Range" },
    { key: "tissue_range", label: "Tissue Range" },
    { key: "cleaning_range", label: "Cleaning Range" },
    { key: "aluminum_foil", label: "Aluminum Foil" },
    { key: "food_wrapping_paper", label: "Food Wrapping Paper" },
    { key: "institution_range", label: "Institution Range" },
  ];

  const variants = ["Rose", "Jasmine", "Sandal", "Lavender", "4 in One"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, productImage: e.target.files[0] });
  };

  const handleVariantChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const updatedVariants = prevData.variants.includes(value)
        ? prevData.variants.filter((variant) => variant !== value)
        : [...prevData.variants, value];

      return { ...prevData, variants: updatedVariants };
    });
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject("Error reading file");
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const base64Image = formData.productImage
        ? await convertImageToBase64(formData.productImage)
        : null;

      const payload = {
        name: formData.productName,
        variants: formData.variants,
        sku: formData.sku,
        image: base64Image
          ? {
              data: base64Image.split(",")[1],
              contentType: formData.productImage.type,
            }
          : null,
        description: formData.description,
        category: formData.category,
      };

      const response = await axios.post(
        "https://factoryseghar-backend.onrender.com/api/addItem",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Product added successfully!");
        setFormData({
          category: "",
          variants: [],
          productName: "",
          productImage: null,
          sku: "",
          description: "",
        });
      } else {
        setMessage("Failed to add the product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Add Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Category Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Variants Checkboxes */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Variants (Optional)
          </label>
          <div className="flex flex-wrap gap-4">
            {variants.map((variant, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`variant-${variant}`}
                  name="variants"
                  value={variant}
                  checked={formData.variants.includes(variant)}
                  onChange={handleVariantChange}
                  className="mr-2"
                />
                <label htmlFor={`variant-${variant}`} className="text-gray-700">
                  {variant}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-4">
          <label htmlFor="sku" className="block text-gray-700 font-medium mb-2">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            placeholder="Enter SKU"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Image */}
        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Image
          </label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* Display Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-green-500">{message}</p>
      )}
    </div>
  );
};

export default Addproducts;
