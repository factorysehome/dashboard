import React, { useState } from "react";
import axios from 'axios'
import { apiUri } from "../../../services/apiEndPoints";
import { CustomAlert, CustomLoading } from "../../../components";

const ProductForm = () => {

  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showAlert = (message) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
    setAlertMessage("");
  };
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    description: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    category: "",
  });

  const categories = [
    { key: "pooja_range", label: "Pooja Range" },
    { key: "tissue_range", label: "Tissue Range" },
    { key: "cleaning_range", label: "Cleaning Range" },
    { key: "aluminum_foil", label: "Aluminum Foil" },
    { key: "food_wrapping_paper", label: "Food Wrapping Paper" },
    { key: "institution_range", label: "Institution Range" },
  ];

  const Products = [
    { key: "Incense Sticks", label: "Incense Sticks" },
    { key: "Dhoop Cones", label: "Dhoop Cones" },
    { key: "Black Dhoop", label: "Black Dhoop" },
    { key: "Dhoop Sticks", label: "Dhoop Sticks" },
    { key: "Gangajal", label: "Gangajal" },
    { key: "Pure Ghee Wicks", label: "Pure Ghee Wicks" },
    { key: "Deepam Oil", label: "Deepam Oil" },
    { key: "Pooja Camphore", label: "Pooja Camphore" },
    { key: "Cotton Samay Watt", label: "Cotton Samay Watt" },
    { key: "Hawan Samagri", label: "Hawan Samagri" },
    { key: "Cotton Phool Batti", label: "Cotton Phool Batti" },
    { key: "Box Tissue", label: "Box Tissue" },
    { key: "Toilet Roll", label: "Toilet Roll" },
    { key: "Kitchen Towel", label: "Kitchen Towel" },
    { key: "Paper Napkin", label: "Paper Napkin" },
    { key: "Glass Cleaner Sparkling Shine", label: "Glass Cleaner Sparkling Shine" },
    { key: "Dish Wash Gel", label: "Dish Wash Gel" },
    { key: "Floor Cleaner Kill Bacteria & Viruses", label: "Floor Cleaner Kill Bacteria & Viruses" },
    { key: "Toilet Cleaner", label: "Toilet Cleaner" },
    { key: "Hand Wash Purifies & Keeps Hands Clean & Healthy", label: "Hand Wash Purifies & Keeps Hands Clean & Healthy" },
    { key: "White Floor Cleaner", label: "White Floor Cleaner" },
    { key: "Aluminium Foil", label: "Aluminium Foil" },
    { key: "Food Wrapping Paper", label: "Food Wrapping Paper" },
    { key: "Dish Wash", label: "Dish Wash" },
    { key: "Disinfectant Floor Cleaner", label: "Disinfectant Floor Cleaner" },
    { key: "Bathroom & Tile Cleaner", label: "Bathroom & Tile Cleaner" },
    { key: "Floor Cleaner", label: "Floor Cleaner" },
    { key: "Glass Cleaner", label: "Glass Cleaner" },
    { key: "Hand Wash", label: "Hand Wash" },
  ];

  const variants = [
    { key: "Rose", label: "Rose" },
    { key: "Jasmine", label: "Jasmine" },
    { key: "Sandal", label: "Sandal" },
    { key: "Lavender", label: "Lavender" },
    { key: "4 in One", label: "4 in One" },
    { key: "Food Wrapping Paper", label: "Food Wrapping Paper" },
    { key: "Available in 4 color", label: "Available in 4 color" },
    { key: "Pack of 10", label: "Pack of 10" },
    { key: "Pack of 6", label: "Pack of 6" },
    { key: "Pack of 2", label: "Pack of 2" },
    { key: "PLY - 1", label: "PLY - 1" },
    { key: "PLY - 2", label: "PLY - 2" },
  ];

  const paperType = [
    { key: "Virgin", label: "Virgin" },
    { key: "Virgin2", label: "Virgin2" },
    { key: "Virgin3", label: "Virgin3" },
    { key: "Virgin4", label: "Virgin4" },
  ];

  const sku = [
    { key: "12 Sticks", label: "12 Sticks" },
    { key: "100 Sticks", label: "100 Sticks" },
    { key: "250 gm.", label: "250 gm." },
    { key: "20 Pieces", label: "20 Pieces" },
    { key: "500 ml.", label: "500 ml." },
    { key: "20 N", label: "20 N" },
    { key: "200 ml.", label: "200 ml." },
    { key: "50 gm.", label: "50 gm." },
    { key: "100 ml.", label: "100 ml." },
    { key: "100 Pulls", label: "100 Pulls" },
    { key: "250 ml.", label: "250 ml." },
    { key: "750 ml.", label: "750 ml." },
    { key: "1000 ml.", label: "1000 ml." },
    { key: "5000 ml.", label: "5000 ml." },
    { key: "9 Meter", label: "9 Meter" },
    { key: "25 Meter", label: "25 Meter" },
    { key: "72 Meter", label: "72 Meter" },
    { key: "11 Meter", label: "11 Meter" },
  ];

  const [productDetails, setProductDetails] = useState([
    {
      variants: "",
      paperType: "",
      numberOfPulls: "",
      numberOfRolls: "",
      caseSize: "",
      sku: "",
    },
  ]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = productDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setProductDetails(updatedDetails);
  };

  const addProductDetail = () => {
    const newProductDetail = {
      variants: "",
      paperType: "",
      numberOfPulls: "",
      caseSize: "",
      numberOfRolls: "",
      sku: "",
    };
  
    // Filter out keys with empty values
    const filteredProductDetail = Object.fromEntries(
      Object.entries(newProductDetail).filter(([_, value]) => value)
    );
  
    setProductDetails([...productDetails, filteredProductDetail]);
  };
  

  const removeProductDetail = (index) => {
    setProductDetails(productDetails.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
      showAlert("Name is required");
      // alert("Name is required");
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
      showAlert("Image is required");

    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      showAlert("Category is required");

    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    console.log("Is form valid?", isValid);
  
    if (isValid) {
      try {
        let base64Image = "";
        if (formData.image) {
          console.log("Converting image to Base64...");
          base64Image = await convertImageToBase64(formData.image);
        }
        const payload = {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          productDetail: productDetails,
          image: base64Image,
        };
        const fullUrl = `${apiUri.addProductApi}`;
        setLoading(true)
        console.log("fullUrl:", fullUrl);
        // console.log("Final Form Data:", JSON.stringify(payload, null, 2));

        const response = await axios.post(fullUrl,payload,{
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Final response Data:", JSON.stringify(response, null, 2));
  
        if (response.status === 201) {
          setLoading(false)

          showAlert("Product added successfully!");
          alert("Product added successfully!");
          setFormData({
            category: "",
            variants: [],
            productName: "",
            productImage: null,
            sku: "",
            description: "",
          });
        } else {
          showAlert("Failed to add the product. Please try again.");
        }



      } catch (error) {
        setLoading(false)
        showAlert("Error in handleSubmit:");
        console.error("Error in handleSubmit:", error);
      }
    } else {
      console.warn("Form validation failed.");
    }
  };
  

  return (

    <>
       <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg shadow-lg space-y-6"
      >
      <h2 className="text-3xl font-semibold text-white text-center">Product Form</h2>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">Name:</label>
          <select
            value={formData.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select a Product
            </option>
            {Products.map((product) => (
              <option key={product.key} value={product.key}>
                {product.label}
              </option>
            ))}
          </select>
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">Category:</label>
          <select
            value={formData.category}
            onChange={(e) => handleFormChange("category", e.target.value)}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category.key} value={category.key}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-600 text-sm">{errors.category}</p>}
        </div>

        {/* <div className="space-y-4">
          <label className="block text-lg font-medium text-white">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.image && <p className="text-red-600 text-sm">{errors.image}</p>}
        </div> */}

<div className="space-y-4">
          <label className="block text-lg font-medium text-white">Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-white">Selected Image:</p>
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Selected"
                className="mt-2 w-30 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          {errors.image && <p className="text-red-600 text-sm">{errors.image}</p>}
        </div>

        <div className="space-y-4">
          <label className="block text-lg font-medium text-white">Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleFormChange("description", e.target.value)}
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        <div>
          <h3 className="text-2xl text-white">Product Details</h3>
          {productDetails.map((detail, index) => (

            <div key={index} className="space-y-4">


              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">Variant:</label>
                <select
                  value={detail.variants}
                  onChange={(e) => handleDetailChange(index, "variants", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Variant
                  </option>
                  {variants.map((variant) => (
                    <option key={variant.key} value={variant.key}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </div>


              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">SKU:</label>
                <select
                  value={detail.sku}
                  onChange={(e) => handleDetailChange(index, "sku", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select SKU
                  </option>
                  {sku.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">Case Size:</label>
                <input
                  type="text"
                  value={detail.caseSize}
                  onChange={(e) => handleDetailChange(index, "caseSize", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">Paper Type:</label>
                <select
                  value={detail.paperType}
                  onChange={(e) => handleDetailChange(index, "paperType", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Paper Type
                  </option>
                  {paperType.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">Number of Rolls:</label>
                <input
                  type="text"
                  value={detail.numberOfRolls}
                  onChange={(e) => handleDetailChange(index, "numberOfRolls", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-lg font-medium text-white">Number of Pulls:(Per Roll )</label>
                <input
                  type="text"
                  value={detail.numberOfPulls}
                  onChange={(e) => handleDetailChange(index, "numberOfPulls", e.target.value)}
                  className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

          

    

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => removeProductDetail(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProductDetail}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Add Product Detail
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white py-3 px-6 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <CustomAlert
        message={alertMessage}
        visible={isAlertVisible}
        onClose={closeAlert}
      />
    <CustomLoading
        visible={loading}
      />
      </>
 
  );
};

export default ProductForm;
