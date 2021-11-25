import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography, createTheme } from "@mui/material";
import { colors, typography } from '$lib/theme'
import logo from '../../static/assets/pav_footer_logo.svg'

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
  textDecoration: 'none',
}
const Footer = () => {
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#F8F9FF',
        width: '100vw',
        padding: '40px 10%',
        boxSizing: 'border-box'
      }}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '66px',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px'
          }
        }}
      >
        <Box
          component="div"
          maxWidth="270px"
          sx={{
            [theme.breakpoints.down('md')]: {
              marginBottom: '20px'
            }
          }}
        > 
          <Box sx={{ 
              [theme.breakpoints.down('md')]: {
              textAlign: 'center',
            }}}>
            <img src={logo} alt="" />
          </Box>
          <Typography
            component="p"
            color={colors.gray[500]}
            fontSize={typography.fontSize.sm}
            marginTop="16px"
            sx={{
              [theme.breakpoints.down('md')]: {
                textAlign: 'center'
              }
            }}
          >
            The all-in-one organization platform for university students.
          </Typography>
        </Box>

        <Box
          component="div"
          display="flex"
          flexDirection="column"
          margin="auto 0"
        >
          <Link style={linkStyles} to="/">
            <Typography 
              paddingBottom="24px" 
              fontSize={typography.fontSize.sm} 
              color={colors.gray[500]}
              sx={{ 
              [theme.breakpoints.down('md')]: {
              textAlign: 'center',
            },}}>
                Home
            </Typography>
          </Link>
          <Link style={linkStyles} to="/organizations">
            <Typography 
              paddingBottom="24px" 
              fontSize={typography.fontSize.sm} 
              color={colors.gray[500]}
              sx={{ 
              [theme.breakpoints.down('md')]: {
              textAlign: 'center',
            },}}>
                Organizations
            </Typography>
          </Link>
          <Link style={linkStyles} to="/admin">
            <Typography 
              paddingBottom="24px" 
              fontSize={typography.fontSize.sm} 
              color={colors.gray[500]}
              sx={{ 
              [theme.breakpoints.down('md')]: {
              textAlign: 'center',
            }}}>
                Admins Log In
            </Typography>
          </Link>
        </Box>
      </Box>
      <Typography
        component="p"
        color={colors.gray[400]}
        fontSize={typography.fontSize.xs}
        sx={{ 
          [theme.breakpoints.down('md')]: {
          textAlign: 'center',
        }}}
      >
        Passionately made by Google Developer Student Clubs - Loyola
      </Typography>
    </Box>
  )
}

export default Footer