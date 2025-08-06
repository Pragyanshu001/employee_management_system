import { DatePicker } from "@heroui/react";
import React, { useState } from "react";

import { useAuth } from "../../AuthProvider/AuthProvider";
import { toast } from "react-toastify";

const CreateNew_Employee = () => {
  const { addEmployee } = useAuth();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      avatar,
      email,
      password,
      role,
      status,
    };

    try {
      const res = await fetch(
        "https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        }
      );
      if (!res.ok) throw new Error("Employee create failed");
      const data = await res.json();
      toast.success("Employee created successfully!");
      console.log(data);

      // ✅ Update context
      addEmployee(data);

      //RESET
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
      setRole("");
      setStatus("");
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="w-full mt-2 rounded-3xl">
      <form
        onSubmit={handleSubmit}
        className=" h-113 bg-gradient-to-b from-blue-300 to-purple-900 w-full rounded-3xl px-10 flex flex-wrap items-start justify-between"
      >
        <div className=" w-full">
          {/* Name */}
          <div className="mt-5">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className=" bg-gray-200 placeholder-[#506F95] p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded w-full "
            />
          </div>

          {/* Avatar */}
          <div className="mt-7">
            <input
              onChange={(e) => setAvatar(e.target.value)}
              type="text"
              value={avatar}
              placeholder="Avatar URL"
              className="bg-gray-200 placeholder-[#506F95] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded w-full"
            />
          </div>

          {/* Email */}
          <div className="mt-7">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              value={email}
              placeholder="Email"
              className=" bg-gray-200 placeholder-[#506F95] p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded w-full "
            />
          </div>

          {/* Password */}
          <div className="mt-7">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" bg-gray-200 placeholder-[#506F95] p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded w-full "
            />
          </div>

          {/* role */}
          <div className="mt-7">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className=" w-full bg-gray-200 text-[#506F95] p-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded "
            >
              <option value="" disabled>
                Select Employee
              </option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Status */}
          <div className="mt-7">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-200 text-[#506F95] p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Buttons */}

          <div className=" flex justify-center">
            <button
              className=" transition duration-300 ease-in-out hover:shadow-md hover:scale-105 text-white hover:bg-emerald-500  cursor-pointer 
              mb-4 flex justify-center w-[40%] font-semibold py-2 rounded bg-emerald-400 mt-7"
            >
              Create Employee
            </button>
            <button
              className="  transition duration-300 ease-in-out hover:shadow-md hover:scale-105 text-white hover:bg-cyan-950  cursor-pointer bg-cyan-900 mb-4 ml-5 font-semibold flex justify-center w-[20%] py-2 rounded mt-7"
              type="reset"
              onClick={() => {
                setName("");
                setAvatar("");
                setEmail("");
                setPassword("");
                setRole("");
                setStatus("");
              }}
            >
              RESET
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNew_Employee;
