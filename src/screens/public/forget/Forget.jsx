import React from "react";
import gi from "../../../../src/assets/icons/google.svg";
import C_TextInput from "../../../components/commonCom/C_TextInput";
import Logo from "../../../components/appComonent/Logo";
import C_button from "../../../components/commonCom/C_button";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const Forget = () => {
  return (
    <>
      <div className="bg-black min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
        {/* Left Section */}
        <div className="h-full text-white bg-black flex flex-col items-center justify-center p-4 lg:p-0 md:p-4 sm:p-4">
          <p className="text-4xl lg:text-7xl md:text-5xl sm:text-4xl text-center">No Worries.!!</p>
          <i className="p-4 text-2xl lg:text-4xl md:text-3xl sm:text-2xl rounded border border-white mt-6 text-center">
            Take me back.!
          </i>
        </div>

        {/* Right Section */}
        <div className="h-full bg-black text-white flex flex-col items-center justify-center p-4 lg:p-0 md:p-4 sm:p-4">
          <form className="w-full max-w-md mx-auto border rounded-xl border-white p-6 lg:p-10 md:p-6 sm:p-4 lg:py-20 md:py-12 sm:py-8 px-15">
            <div className="mb-5">
              <label htmlFor="login" className="block mb-4 text-4xl lg:text-7xl md:text-5xl sm:text-4xl font-medium text-white text-center">
                Forgot Password ? <br />
                <span className="text-lg lg:text-xl md:text-lg sm:text-base mt-3">Please enter you’re email</span>
              </label>
              <C_TextInput placeholder="example@gmail.com" />
            </div>

            {/* Register Button */}
            <C_button text="Reset Password" />
            <br />

            {/* Divider */}
            <div className="inline-flex items-center justify-center w-full relative">
              <hr className="w-48 lg:w-64 md:w-40 sm:w-32 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <span className="absolute px-2 font-medium text-white -translate-x-1/2 left-1/2 bg-black">
                or
              </span>
            </div>

            {/* Login Link and Footer Links */}
            <div className="mt-5 text-center">
              <p className="text-sm lg:text-base md:text-sm sm:text-xs">
                Dont't have account? <Link to="/register">Sign up</Link>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-0 mt-3 place-items-center">
                <a href="https://www.google.com" className="text-sm lg:text-base md:text-sm sm:text-xs text-nowrap">Terms & conditions</a>
                <a href="https://www.google.com" className="text-sm lg:text-base md:text-sm sm:text-xs">Support</a>
                <a href="https://www.google.com" className="text-sm lg:text-base md:text-sm sm:text-xs">Customer Care</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;