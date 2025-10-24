// import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../AuthProvider/AuthProvider";

const Switch = ({ isActive, onToggle }) => {
  return (
    <StyledWrapper>
      <label className="switch-button" htmlFor="switch">
        <div className="switch-outer ">
          <input
            id="switch"
            type="checkbox"
            checked={isActive}
            onChange={onToggle}
          />
          <div className="button">
            <span className="button-toggle" />
            <span className="button-indicator" />
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
};

const TaskStatus = () => {
  const { employees } = useAuth();
  const loggedIn = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const data = employees.find((emp) => emp.id === loggedIn?.id);
  if (!data) return <p className="text-center mt-10">User not found...</p>;

  if (!data?.id) return <p className="text-center mt-10">missing...</p>;
  return (
    <div className="flex gap-5 shadow-md items-center p-3 rounded-2xl bg-white justify-between ">
      <img
        className="transition ease-in duration-200 cursor-pointer hover:scale-105 hover:bg-red-400/75 shadow-md shadow-red-300 size-[30%] sm:size-auto rounded-2xl "
        src={data.avatar}
      />

      <div>
        <div className=" lg:flex-row flex-col flex bg-white rounded-4xl mt-1 gap-5 justify-between ">
          <div className=" gap-5 flex">
            <div className="transition ease-in duration-300 cursor-pointer hover:scale-[1px] hover:bg-purple-400/75 flex flex-col items-center shadow-md shadow-purple-300 justify-center rounded-xl w-22 h-22 lg:w-40 lg:h-40 bg-purple-200">
              <div>
                <h1 className="lg:w-10 lg:h-10 w-8 h-8 bg-purple-300  rounded-full flex justify-center lg:text-xl text-3xl font-semibold">
                  {data?.taskCount?.newTask || "--"}
                </h1>
              </div>
              <h1 className="text-medium flex justify-center mt-3 font-medium">
                NewTask
              </h1>
            </div>
            <div className="transition ease-in duration-300 cursor-pointer hover:scale-[1px] hover:bg-blue-400/75 shadow-md shadow-blue-300 flex flex-col items-center justify-center rounded-xl w-22 h-22 lg:w-40 lg:h-40 bg-blue-200">
              <h1 className="lg:w-10 lg:h-10 w-8 h-8 bg-blue-300 rounded-full flex justify-center lg:text-xl text-3xl font-semibold">
                {data?.taskCount?.active || "--"}
              </h1>
              <h1 className=" text-medium flex justify-center  mt-3 font-medium">
                Active
              </h1>
            </div>
          </div>
          <div className=" gap-5 flex">
            <div className=" transition ease-in duration-300 cursor-pointer hover:scale-[1px] hover:bg-green-400/75 shadow-md shadow-green-300 flex flex-col items-center justify-center rounded-xl w-22 h-22 lg:w-40 lg:h-40 bg-green-200">
              <h1 className=" lg:w-10 lg:h-10 w-8 h-8 bg-green-300 rounded-full flex justify-center lg:text-xl text-3xl font-semibold">
                {data?.taskCount?.completed || "--"}
              </h1>
              <h1 className=" text-medium flex justify-center  mt-3 font-medium">
                Completed
              </h1>
            </div>
            <div className="transition ease-in duration-300 cursor-pointer hover:scale-[1px] hover:bg-red-400/75 shadow-md shadow-red-300 flex flex-col items-center justify-center rounded-xl w-22 h-22 lg:w-40 lg:h-40 bg-red-200">
              <h1 className=" lg:w-10 lg:h-10 w-8 h-8 bg-red-300 rounded-full flex justify-center lg:text-xl text-3xl font-semibold">
                {data?.taskCount?.failed || "--"}
              </h1>
              <h1 className=" text-medium flex justify-center  mt-3 font-medium">
                Failed
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;

const StyledWrapper = styled.div`
  .switch-button {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    justify-content: center;
    margin: auto;
    height: 55px;
  }

  .switch-button .switch-outer {
    height: 100%;
    background: #252532;
    width: 115px;
    border-radius: 165px;
    -webkit-box-shadow: inset 0px 5px 10px 0px #16151c, 0px 3px 6px -2px #403f4e;
    box-shadow: inset 0px 5px 10px 0px #16151c, 0px 3px 6px -2px #403f4e;
    border: 1px solid #32303e;
    padding: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .switch-button .switch-outer input[type="checkbox"] {
    opacity: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    position: absolute;
  }

  .switch-button .switch-outer .button-toggle {
    height: 42px;
    width: 42px;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#3b3a4e),
      to(#272733)
    );
    background: -o-linear-gradient(#3b3a4e, #272733);
    background: linear-gradient(#3b3a4e, #272733);
    border-radius: 100%;
    -webkit-box-shadow: inset 0px 5px 4px 0px #424151, 0px 4px 15px 0px #0f0e17;
    box-shadow: inset 0px 5px 4px 0px #424151, 0px 4px 15px 0px #0f0e17;
    position: relative;
    z-index: 2;
    -webkit-transition: left 0.3s ease-in;
    -o-transition: left 0.3s ease-in;
    transition: left 0.3s ease-in;
    left: 0;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .button-toggle {
    left: 58%;
  }

  .switch-button
    .switch-outer
    input[type="checkbox"]:checked
    + .button
    .button-indicator {
    -webkit-animation: indicator 1s forwards;
    animation: indicator 1s forwards;
  }

  .switch-button .switch-outer .button {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

  .switch-button .switch-outer .button-indicator {
    height: 25px;
    width: 25px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border-radius: 50%;
    border: 3px solid #ef565f;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    right: 10px;
    position: relative;
  }

  @-webkit-keyframes indicator {
    30% {
      opacity: 0;
    }

    0% {
      opacity: 1;
    }

    100% {
      opacity: 1;
      border: 3px solid #60d480;
      left: -68%;
    }
  }

  @keyframes indicator {
    30% {
      opacity: 0;
    }

    0% {
      opacity: 1;
    }

    100% {
      opacity: 1;
      border: 3px solid #60d480;
      left: -68%;
    }
  }
`;
