import React from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

import { colors, typography } from '$lib/theme'
import logo from '../../../static/assets/pav_footer_logo.svg'

const Footer = () => {
  const linkStyles = {
    color: colors.gray[500],
    fontSize: typography.fontSize.sm,
    textDecoration: 'none',
    paddingBottom: '24px'
  }

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
          marginBottom: '66px'
        }}
      >
        <Box
          component="div"
          maxWidth="270px"
        >
          <img src={logo} alt="" />
          <Typography
            component="p"
            color={colors.gray[500]}
            fontSize={typography.fontSize.sm}
            marginTop="16px"
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
          <Link style={linkStyles} to="/">Home</Link>
          <Link style={linkStyles} to="/organizations">Organizations</Link>
          <Link style={{...linkStyles, paddingBottom: '0'}} to="/admin/login">Admin Log In</Link>
        </Box>
      </Box>
      <Typography
        component="p"
        color={colors.gray[400]}
        fontSize={typography.fontSize.xs}
      >
        Passionately made by Google Developer Student Clubs - Loyola
      </Typography>
    </Box>
  )
}

export default Footer
