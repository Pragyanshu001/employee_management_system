import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(sessionStorage.getItem("loggedInUser")) || null
  );

  useEffect(() => {
    const fetchLoggedUserTasks = async () => {
      try {
        const res = await fetch(
          `https://6883945221fa24876a9e938e.mockapi.io/api/v1/employees`
        );
        const updatedUser = await res.json();
        setEmployees(updatedUser);
      } catch (err) {
        console.log("Failed to fetch tasks:", err);
      }
    };

    fetchLoggedUserTasks();
  }, []);

  // fetch employees when app loads

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  return (
    <AuthContext.Provider
      value={{
        employees,
        setEmployees,
        addEmployee,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
