import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { Box } from "@mui/material";

import { colors } from '$lib/theme'
import whiteLogo from '../../../static/assets/pav_logo.svg'
import blueLogo from '../../../static/assets/pav_logo_blue.svg'
import { Button } from "@mui/material";

const NavBar = ({transparent}) => {
  const pathname = useLocation().pathname

  const linkStyles = {
    color: pathname === '/organizations' ? colors.blue[300] : transparent ? 'white' : colors.gray[500],
    textDecoration: 'none',
    margin: 'auto 0'
  }

  return (
    <Box component="div"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '20px 10%',
        backgroundColor: transparent ? 'transparent' : 'white',
        boxShadow: !transparent && '0px 4px 10px rgba(0, 0, 0, 0.08)',
        position: 'absolute',
        zIndex: '5'
      }}
    >
      {
        transparent ?
        <Link to="/"><img src={whiteLogo} alt="" /></Link>
        :
        <Link to="/"><img src={blueLogo} alt="" /></Link>
      }
      <Box
        sx={{
          display: 'flex',
          gap: '48px'
        }}
      >
        <Link style={linkStyles} to="/">Home</Link>
        <Link style={linkStyles} to="/organizations" className={pathname === '/organizations' && 'active-link'}>Organizations</Link>
        <Button sx={{ borderRadius: '4px', padding: '8px 24px', backgroundColor: 'linear-gradient(90deg, #498AF4 0%, #1A73E8 100%)' }}>Join the waitlist</Button>
      </Box>
    </Box>
  )
}

export default NavBar
