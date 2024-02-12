import React from "react";
import "@radix-ui/themes/styles.css";
import NavBar from "../Components/Navbar";
import DashBoardRoutes from "../Router/DashBoardRoutes";

// import Billboard from "./Billboard";
const Dashboard = () => {
  return (
    <div className="w-full min-h-[100vh] bg-white">
      <NavBar />
      <DashBoardRoutes />
    </div>
  );
};

export default Dashboard;
