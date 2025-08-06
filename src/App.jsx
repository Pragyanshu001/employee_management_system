import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/DashBoard/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard";
import { Admin_Tabs } from "./components/others/Admin_Tabs";
import EmployeeDashBoard from "./components/DashBoard/EmployeeDashBoard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/employeeDashboard",
    element: <EmployeeDashBoard />,
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
