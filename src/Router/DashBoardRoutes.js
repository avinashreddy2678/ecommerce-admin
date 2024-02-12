import React from "react";
import { Route, Routes } from "react-router-dom";
import Billboard from "../Pages/BillBoard";
import Product from "../Pages/Product";
import DashBoardOverview from "../Pages/Overview";
import Orders from "../Pages/Orders";

const DashBoardRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DashBoardOverview/>}/>
        <Route path="/Billboard" element={<Billboard />}></Route>
        <Route path="/Product" element={<Product />}></Route>
        <Route path="/Orders" element={<Orders />}></Route>
      </Routes>
    </div>
  );
};

export default DashBoardRoutes;
