import React from 'react'

import NavBar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const Layout = ({children, transparent_nav}) => {
  return (
    <>
      <NavBar transparent={transparent_nav} heroRef={children}  />
        { children }
      <Footer />
    </>
  )
}

export default Layout
