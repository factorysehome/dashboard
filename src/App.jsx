import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Forget, Login, Register } from "./screens/public/index";
import Afterlogin from "./screens/private/Afterlogin";
import Addproducts from "./screens/private/products/Addproducts";
import Dashboard from "./screens/private/dashboard/Dashboard";
import About from "./screens/private/dashboard/About";
import Contact from "./screens/private/dashboard/Contact";
import Portfolio from "./screens/private/dashboard/Portfolio";
import Service from "./screens/private/dashboard/Service";
import Viewproduct from "./screens/private/dashboard/Viewproduct";
import EditProduct from "./screens/private/dashboard/EditProduct";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("loggedInUser") !== null;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login on '/' */}
        
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/afterlogin" element={<ProtectedRoute element={<Afterlogin />} />} />
        <Route path="/addproducts" element={<ProtectedRoute element={<Addproducts />} />} />
        <Route path="/about" element={<ProtectedRoute element={<About />} />} />
        <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/portfolio" element={<ProtectedRoute element={<Portfolio />} />} />
        <Route path="/service" element={<ProtectedRoute element={<Service />} />} />
        <Route path="/viewproduct" element={<ProtectedRoute element={<Viewproduct />} />} />
        <Route path="/editproduct/:id" element={<ProtectedRoute element={<EditProduct />} />} />
        
        {/* 404 */}
        <Route path="*" element={<h1 className="text-center text-3xl mt-[300px]">No Page Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
