import Header from "Components/Header";
import Sidebar from "Components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet /> 
    </>
  );
};

export default MainLayout;
