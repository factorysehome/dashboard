import React from 'react';
import { useParams, useLocation } from "react-router-dom";

const EditProduct = () => {
  // useParams() hook from React Router to get route parameters
  const location = useLocation();
  const product = location.state?.product;
  
  console.log("Editing Product ID:", JSON.stringify(product,null,2));

  return (
    <div>
      Editing Product ID:
    </div>
  );
};

export default EditProduct;
