import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/Signup";
import SignIn from "../Pages/SignIn";
import Dashboard from "../Pages/Dashboard";

const AllRoutes = () => {
  
  return (
    <div>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<SignIn />} />
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
