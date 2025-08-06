"use client";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../AuthProvider/AuthProvider";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";

const Header = () => {
  function AvatarPopover({ employee }) {
    console.log(employee);

    if (!employee) return null;

    return (
      <Popover showArrow offset={10} placement="bottom">
        <PopoverTrigger>
          <div className="transition duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:bg-blue-400  flex bg-blue-200 px-3 gap-3 py-2 rounded-4xl cursor-pointer">
            <img
              className="size-10 rounded-full cursor-pointer"
              src={`${employee.avatar}`}
              alt="Avatar"
            />
            <img
              className="size-10  "
              src="https://img.icons8.com/?size=100&id=oStKNuPVzV7A&format=png&color=000000"
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-[240px]">
          {() => (
            <div className=" w-full">
              <div className="gap-2 flex">
                <img
                  className="size-15 rounded-xl cursor-pointer"
                  src={`${employee.avatar}`}
                />
                <div>
                  <h1 className="text-gray-700  text-xl">
                    <b>Hello</b>, <i> {` ${employee.name}`}</i>
                  </h1>
                  <h1 className="text-gray-500">{` ${employee.role}`}</h1>
                </div>
              </div>
              <div className="shadow-md bg-gray-200 rounded-2xl p-2 mt-2">
                <p className="font-semibold text-gray-700">All Notifications</p>

                {employee?.tasks?.map((elem, index) => (
                  <div key={index} className="text-sm text-gray-600 mt-1">
                    🔔 {elem.title}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  // const { employees } = useAuth();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchLoggedInEmployee = async () => {
      try {
        const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        if (!loggedUser) {
          navigate("/");
          return;
        }

        if (loggedUser.role == "admin") {
          setEmployee(loggedUser || {});
        } else {
          const res = await fetch(
            `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees/${loggedUser.id}`
          );
          const updatedUser = await res.json();

          setEmployee(updatedUser || []);
        }
      } catch (err) {
        console.log("Failed to fetch tasks:", err);
      }
    };

    fetchLoggedInEmployee();
  }, []);
  // console.log(employee);

  const logOutUser = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <>
      <div className=" flex justify-between items-center">
        <h1 className="text-[#042043] text-3xl font-semibold">
          Hello
          <br />{" "}
          <span className="text-5xl font-semibold">
            {employee?.name || "Admin"}👋
          </span>
        </h1>
        <div className="mr-2 flex items-center justify-between rounded-xl p-2 bg-gradient-to-r from-pink-300 via-red-400 to-yellow-300  w-60 ">
          <div className=" ">
            <AvatarPopover employee={employee} />
          </div>

          <button
            onClick={logOutUser}
            className="transition duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:bg-red-400  cursor-pointer bg-[#F48D90] text-white font-medium rounded px-5 py-2"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
