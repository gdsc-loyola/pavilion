import React from "react";

import NavBar from "./Navbar";
import Footer from "./Footer";

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
