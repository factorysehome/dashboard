import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import './App.css';
import { Forget, Login, Register } from './screens/public/index';
import Afterlogin from './screens/private/Afterlogin';
import Addproducts from './screens/private/Products/Addproducts';
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/afterlogin" element={<Afterlogin />} />
        <Route path="/addproducts" element={<Addproducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;