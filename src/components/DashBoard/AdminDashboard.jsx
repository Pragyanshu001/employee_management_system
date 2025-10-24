import React from "react";
import background from "../../assets/emsBG.png";
import { Admin_Tabs } from "../others/Admin_Tabs";
import Header from "../others/Header";

const AdminDashboard = () => {
  return (
    <div
      className="p-3 w-full bg-cover bg-no-repeat bg-center h-screen "
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />
      <Admin_Tabs />
    </div>
  );
};

export default AdminDashboard;
