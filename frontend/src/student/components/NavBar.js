import React, { useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { Box, createTheme } from "@mui/material";

import { colors } from '$lib/theme'
import whiteLogo from '../../../static/assets/pav_logo.svg'
import blueLogo from '../../../static/assets/pav_logo_blue.svg'
import { Button } from "@mui/material";

const NavBar = ({transparent}) => {
  const pathname = useLocation().pathname

  // const isTransparent = transparent
  // const [isTransparent, setIsTransparent] = useState(transparent)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  // useEffect(() => {
  //   if (mobileNavOpen && isTransparent) {
  //     transparent = false
  //   } else if (!mobileNavOpen && isTransparent) {
  //     transparent = true
  //   }
  // }, [mobileNavOpen])

  // const theme = useTheme()
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    }
  })

  const linkStyles = {
    color: pathname === '/organizations' ? colors.blue[300] : mobileNavOpen ? colors.gray[500] : transparent ? 'white' : colors.gray[500],
    textDecoration: 'none',
    margin: 'auto 0',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    }
  }

  return (
    // <div className={`${mobileNavOpen && 'notVisible'} w-64 flex justify-start items-center`}>
    //   <Link to='/'>
    //     <NavLogo className="w-4/5 sm:w-auto" />
    //   </Link>
    // </div>

    // <div className="hidden w-64 md:flex justify-center items-center">
    //   <Link to="/" className="mx-5 text-xs lg:text-base pb-1.5 font-medium" activeClassName="active-nav-item">Home</Link>
    //   <Link to="/pricing" className="mx-5 text-xs lg:text-base pb-1.5 font-medium" activeClassName="active-nav-item">Pricing</Link>
    //   <a href="https://blog.meetbit.io" target="_blank" rel="noreferrer" className="mx-5 text-xs lg:text-base pb-1.5 font-medium">Blog</a>
    // </div>

    // <div className="w-64 flex justify-end items-center">
    //   <a href="https://dashboard.meetbit.io" target="_blank" rel="noreferrer" className="text-xs lg:text-base mr-8 font-medium hidden md:block">Sign in</a>
    //   <a href="https://dashboard.meetbit.io/signup" target="_blank" rel="noreferrer" onClick={handleJoinClick}><button className={`${mobileNavOpen && 'hidden'} join-btn-white`}>Get Started</button></a>
    //   <button className="burger-btn-container ml-8 block md:hidden" onClick={() => setMobileNavOpen(!mobileNavOpen)} style={{zIndex: '80'}}>
    //     <div className={`bar1 ${mobileNavOpen && 'bar1-open'} ml-auto mr-0 bg-white rounded-xl`}></div>
    //     <div className={`bar2 ${mobileNavOpen && 'bar2-open'} ml-auto mr-0 bg-white rounded-xl`}></div>
    //     <div className={`bar3 ${mobileNavOpen && 'bar3-open'} ml-auto mr-0 bg-white rounded-xl`}></div>
    //   </button>
    // </div>

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
        mobileNavOpen ? 
        <Link to="/">
          <Link to="/"><img src={blueLogo} alt="" /></Link>
        </Link>
        :
        transparent && !mobileNavOpen ?
        <Link to="/"><img src={whiteLogo} alt="" /></Link>
        :
        <Link to="/"><img src={blueLogo} alt="" /></Link>
      }

      {/* mobile burger button */}
      <Box
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'end',
            cursor: 'pointer',
            zIndex: '10'
          },
          display: 'none'
        }}
      >
        <Box component="div" sx={{
          backgroundColor: mobileNavOpen || !transparent ? colors.gray[500] : 'white',
          height: '3px',
          width: mobileNavOpen ? '28px' : '20px',
          transition: 'all 0.2s linear',
          transform: mobileNavOpen ? 'rotate(45deg)' : 'rotate(0)',
          transformOrigin: '0'
        }}></Box>
        <Box component="div" sx={{
          backgroundColor: mobileNavOpen || !transparent ? colors.gray[500] : 'white',
          height: '3px',
          width: '28px',
          transition: 'all 0.2s linear',
          opacity: mobileNavOpen ? '0' : '1',
          transform: mobileNavOpen ? 'translateX(20px)' : 'translateX(0)'
        }}></Box>
        <Box component="div" sx={{
          backgroundColor: mobileNavOpen || !transparent ? colors.gray[500] : 'white',
          height: '3px',
          width: mobileNavOpen ? '28px' : '20px',
          transition: 'all 0.2s linear',
          transform: mobileNavOpen ? 'rotate(-45deg)' : 'rotate(0)',
          transformOrigin: '4px'
        }}></Box>
      </Box>

      {/* mobile nav items */}
      <Box
        component="div"
        style={{
          visibility: mobileNavOpen ? 'visible' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          gap: '48px',
          zIndex: '-1',
          position: 'absolute',
          transition: 'all 0.2s ease-in-out',
          top: mobileNavOpen ? '0' : '-150px',
          left: 0,
          width: '100vw',
          padding: '80px 0',
          opacity: mobileNavOpen ? '1' : '0',
        }}
      >
        <Link style={{...linkStyles, color: colors.gray[500]}} to="/">Home</Link>
        <Link style={linkStyles} to="/organizations" className={pathname === '/organizations' && 'active-link'}>Organizations</Link>
        <Button
          sx={{
            borderRadius: '4px',
            backgroundColor: 'linear-gradient(90deg, #498AF4 0%, #1A73E8 100%)',
            fontSize: '12px',
            padding: '4px 16px',
            width: 'fit-content'
          }}
        >
          Join the waitlist
        </Button>
      </Box>

      {/* desktop nav items */}
      <Box
        sx={{
          display: 'flex',
          gap: '48px',
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          }
        }}
      >
        <Link style={{...linkStyles, color: transparent ? 'white' : colors.gray[500],}} to="/">Home</Link>
        <Link style={linkStyles} to="/organizations" className={pathname === '/organizations' && 'active-link'}>Organizations</Link>
        <Button
          sx={{
            borderRadius: '4px',
            padding: '8px 24px',
            backgroundColor: 'linear-gradient(90deg, #498AF4 0%, #1A73E8 100%)',
            [theme.breakpoints.down('md')]: {
              fontSize: '12px',
              padding: '4px 16px'
            }
          }}
        >
          Join the waitlist
        </Button>
      </Box>
    </Box>
  )
}

export default NavBar
