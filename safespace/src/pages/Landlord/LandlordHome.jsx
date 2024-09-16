import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "../../comonents/SideNav";

const LandlordHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <SideNav />
    </>
  );
};

export default LandlordHome;
