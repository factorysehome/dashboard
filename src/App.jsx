import { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Forget, Login, Register } from "./screens/public/index";
import Afterlogin from "./screens/private/Afterlogin";
import Addproducts from "./screens/private/products/Addproducts";
import Dashboard from "./screens/private/dashboard/Dashboard";
import About from "./screens/private/dashboard/About"
import Contact from "./screens/private/dashboard/Contact"
import Portfolio from "./screens/private/dashboard/Portfolio"
import Service from "./screens/private/dashboard/Service"
import Viewproduct from "./screens/private/dashboard/Viewproduct";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard to="/dashboard" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/afterlogin" element={<Afterlogin />} />
        <Route path="/addproducts" element={<Addproducts />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/portfolio" element={<Portfolio/>} />
        <Route path="/service" element={<Service />} />
        <Route path="/viewproduct" element={<Viewproduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
