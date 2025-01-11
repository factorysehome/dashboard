import React, { useState } from "react";
import C_TextInput from "../../../components/commonCom/C_TextInput";
import Logo from "../../../components/appComonent/Logo";
import C_button from "../../../components/commonCom/C_button";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
  
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === pass
    );
  
    if (user) {
      const person = user.name; 
      alert(`Welcome back, ${person}!`);
      navigate("/afterlogin", { state: { person } }); // Redirect to dashboard or home page
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };
  

  return (
    <>
      <div className="bg-black min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Section */}
        <div className="h-full text-white bg-black flex flex-col items-center justify-center p-4 lg:p-0">
          <p className="text-4xl lg:text-7xl text-center">Welcome Back .!</p>
          <i className="p-4 text-2xl lg:text-4xl rounded border border-white mt-6 text-center">
            Skip the lag?
          </i>
        </div>

        {/* Right Section */}
        <div className="h-full bg-black text-white flex flex-col items-center justify-center p-4 lg:p-0">
          <form className="w-full max-w-md mx-auto border rounded-xl border-white p-6 lg:p-10 lg:py-16">
            <div className="mb-5">
              <label
                htmlFor="login"
                className="block mb-4 text-4xl lg:text-7xl font-medium text-white text-center"
              >
                Login <br />
                <span className="text-lg lg:text-xl mt-3">
                  Glad you’re back.!
                </span>
              </label>
              <C_TextInput
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleEmail}
              />
              <C_TextInput
                placeholder="Password"
                type="password"
                value={pass}
                name="password"
                onChange={handlePass}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm lg:text-base font-medium text-white"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <C_button text="Login" onClick={handleClick} />
            <br />

            {/* Forgot Password Link */}
            <Link to="/forget" className="mt-5 text-sm lg:text-base">
              Forget Password?
            </Link>

            {/* Divider */}
            <div className="inline-flex items-center justify-center w-full relative">
              <hr className="w-48 lg:w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-2 font-medium text-white -translate-x-1/2 left-1/2 bg-black">
                or
              </span>
            </div>

            {/* Logo */}
            <Logo className="mt-2" />

            {/* Don't have an account Link and Footer Links */}
            <div className="mt-5 text-center">
              <p className="text-sm lg:text-base">
                Don’t have an account? <Link to="/register">Signup</Link>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mt-3">
                <a
                  href="https://www.google.com"
                  className="text-sm lg:text-base text-nowrap"
                >
                  Terms & conditions
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm lg:text-base"
                >
                  Support
                </a>
                <a
                  href="https://www.google.com"
                  className="text-sm lg:text-base"
                >
                  Customer Care
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
