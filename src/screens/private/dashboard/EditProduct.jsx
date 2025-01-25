import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    description: product?.description || "",
    productDetail: product?.productDetail || [],
  });

  // Handle input changes for top-level fields (name, category, description)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input changes for nested productDetail fields
  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.productDetail];
    updatedDetails[index][field] = value;
    setFormData({ ...formData, productDetail: updatedDetails });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      productDetail: formData.productDetail.map((detail) => ({
        caseSize: detail.caseSize,
        sku: detail.sku,
        price: detail.price,
        variants: Array.isArray(detail.variants)
          ? detail.variants
          : detail.variants.split(",").map((v) => v.trim()), // Ensure variants is an array
      })),
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        `https://factoryseghar-backend.onrender.com/api/updateItem/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      if (data.status === "success") {
        alert("Product updated successfully!");
        navigate("/viewproduct"); // Redirect to the product list page
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

      {/* Image at the top and center */}
      <div className="flex justify-center mb-6">
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt="Product"
          className="w-48 h-48 object-cover rounded-md"
        />
      </div>

      {/* Form for editing product details */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details */}
        {formData.productDetail.map((detail, index) => (
          <div key={index} className="space-y-4 border p-4 rounded-md">
            <h3 className="text-lg font-semibold">
              Product Detail #{index + 1}
            </h3>

            {/* Case Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Case Size
              </label>
              <input
                type="text"
                value={detail.caseSize}
                onChange={(e) =>
                  handleDetailChange(index, "caseSize", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                SKU
              </label>
              <input
                type="text"
                value={detail.sku}
                onChange={(e) =>
                  handleDetailChange(index, "sku", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={detail.price}
                onChange={(e) =>
                  handleDetailChange(index, "price", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Variants */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Variants
              </label>
              <input
                type="text"
                value={
                  Array.isArray(detail.variants)
                    ? detail.variants.join(", ")
                    : detail.variants
                }
                onChange={(e) =>
                  handleDetailChange(index, "variants", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;