import React from 'react';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, transparent_nav }) => {
  return (
    <>
      <Navbar transparent={transparent_nav} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
