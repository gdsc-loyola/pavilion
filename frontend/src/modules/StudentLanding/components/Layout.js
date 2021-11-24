import React from "react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Layout = ({ children, transparent_nav }) => {
  return (
    <>
      <NavBar transparent={transparent_nav} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
