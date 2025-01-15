import React, { useState } from "react";
import C_TextInput from "../../../components/commonCom/C_TextInput";
import C_button from "../../../components/commonCom/C_button";

import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../components/appComonent/Logo";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const handlecPass = (event) => {
    setcPass(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    
    if (!name || !email || !pass || !cpass) {
      alert("All fields are required!");
      return;
    }

    if (pass !== cpass) {
      alert("Passwords do not match!");
      return;
    }

    // Save data to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("User already exists with this email.");
    } else {
      users.push({ name, email, password: pass });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful!");
      navigate("/"); // Redirect to login page
    }
  };

  return (
    <>
      <div className="bg-black min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Section */}
        <div className="h-full text-white bg-black flex flex-col items-center justify-center p-4 lg:p-0">
          <p className="text-4xl lg:text-7xl text-center">Roll the Carpet.!</p>
          <i className="p-4 text-2xl lg:text-4xl rounded border border-white mt-6 text-center">
            Skip the lag?
          </i>
        </div>

        {/* Right Section */}
        <div className="h-full bg-black text-white flex flex-col items-center justify-center p-4 lg:p-0">
          <form className="w-full max-w-md mx-auto border rounded-xl border-white p-6 lg:p-10 lg:py-16">
            <div className="mb-5">
              <label
                htmlFor="register"
                className="block mb-4 text-4xl lg:text-7xl font-medium text-white text-center"
              >
                Signup <br />
                <span className="text-lg lg:text-xl mt-3">
                  Just some details to get you in.!
                </span>
              </label>
              <C_TextInput
                placeholder="Username"
                name="name"
                value={name}
                onChange={handleName}
              />
              <C_TextInput
                placeholder="Email / Phone"
                name="email"
                value={email}
                onChange={handleEmail}
              />
              <C_TextInput
                placeholder="Password"
                name="pass"
                value={pass}
                onChange={handlePass}
              />
              <C_TextInput
                placeholder="Confirm Password"
                name="cpass"
                value={cpass}
                onChange={handlecPass}
              />
            </div>

            {/* Register Button */}
            <C_button text="Register" onClick={handleClick} />
            <br />

            Forgot Password Link
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

            {/* Login Link and Footer Links */}
            <div className="mt-5 text-center">
              <p className="text-sm lg:text-base">
                Already have an account? <Link to="/">Login</Link>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-0 mt-3">
                <Link
                  to="https://www.google.com"
                  className="text-nowrap text-sm lg:text-base"
                >
                  Terms & conditions
                </Link>
                <a href="https://www.google.com" className="text-sm lg:text-base">
                  Support
                </a>
                <a href="https://www.google.com" className="text-sm lg:text-base">
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

export default Register;
