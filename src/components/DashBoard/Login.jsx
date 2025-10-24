import React, { useState } from "react";
import secondLayer from "../../assets/realEMS_login.png";
import background from "../../assets/emsBG.png";
// import Admin_Tabs from "../others/Admin_Tabs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProvider";
// import { avatar } from "@heroui/react";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const { employees, setLoggedInUser } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    if (Email === "admin@example.com" && Password === "123") {
      const adminUser = {
        role: "admin",
        name: "Vijay",
        avatar:
          "data:image/jpeg;base64,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",
      };

      // Save to sessionStorage
      sessionStorage.setItem("loggedInUser", JSON.stringify(adminUser));

      // Update context
      setLoggedInUser(adminUser);

      navigate("/adminDashboard");
      return;
    }

    // Employee login
    if (employees) {
      const found = employees.find(
        (elem) => elem.email === Email && elem.password === Password
      );

      if (found) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(found));
        setLoggedInUser(found);

        navigate("/employeeDashBoard");
      }
    } else {
      toast.error("Invalid Credentials");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="flex justify-center  items-center bg-center w-[100vw] h-screen bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div
        className=" rounded-2xl flex justify-end items-center max-md:hidden h-[85%] w-[60%] bg-left bg-cover "
        style={{ backgroundImage: `url(${secondLayer})` }}
      >
        <div className="w-[35%] flex flex-col justify-center items-center rounded-2xl bg-gray-50 mt-50 lg:mt-30 lg:mr-10 mr-3 px-3 py-15 mb-30">
          <h2 className="text-6xl  font-bold text-blue-900  lg:mb-6">Login</h2>
          <form
            onSubmit={submitHandler}
            className="flex flex-col w-full max-w-sm space-y-4"
          >
            <input
              required
              value={Email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="transform ease-in duration-75 hover:scale-[1.01] hover:bg-blue-50 font-semibold hover:text-black mt-5  border bg-gray-200 border-gray-300 rounded-md px-1 py-1 lg:px-4 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              required
              value={Password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="transform ease-in duration-75 hover:scale-[1.01] hover:bg-blue-50 font-semibold hover:text-black bg-gray-200 border border-gray-300 rounded-md px-1 py-1 lg:px-4 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className=" duration-300 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer  bg-yellow-400 hover:bg-yellow-500 transition-colors text-white font-semibold rounded-md py-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="w-[350px] min-md:hidden flex flex-col justify-center items-center rounded-2xl bg-gray-50 m-auto px-3 py-15 ">
        <h2 className="text-6xl font-bold text-blue-900">Login</h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full max-w-sm space-y-4"
        >
          <input
            required
            value={Email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="transform ease-in duration-75 hover:scale-[1.01] hover:bg-blue-50 font-semibold hover:text-black mt-5 lg:mt-10 border bg-gray-200 border-gray-300 rounded-md px-1 py-1 lg:px-4 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            required
            value={Password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="transform ease-in duration-75 hover:scale-[1.01] hover:bg-blue-50 font-semibold hover:text-black lg:mt-7 bg-gray-200 border border-gray-300 rounded-md px-1 py-1 lg:px-4 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className=" duration-300 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer lg:mt-10 bg-yellow-400 hover:bg-yellow-500 transition-colors text-white font-semibold rounded-md py-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
