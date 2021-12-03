import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { Box, useMediaQuery } from '@mui/material';

import { theme } from '$lib/theme';
import NavbarLogo from './NavbarLogo';
import Burger from './Burger';
import NavItems, { NavItemList } from './NavItems';

const { colors } = theme;

/**
 * @type {NavItemList}
 */
const NAV_ITEMS = [
  { label: 'Home', to: '/', preventActiveColor: true },
  {
    label: 'Organizations',
    to: '/organizations',
  },
];

const NavBar = ({ transparent }) => {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const smVW = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="div"
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        padding: '20px 10%',
        backgroundColor:  transparent ? 'transparent' : 'white',
        boxShadow: !transparent && '0px 4px 10px rgba(0, 0, 0, 0.08)',
        position: 'fixed',
        zIndex: '5',
        transition: 'all 0.2s ease-in-out',
        [theme.breakpoints.down('sm')]: {
          padding: '14px 16px',
        },
      }}
    >
      {transparent && !mobileNavOpen ? (
        <NavbarLogo color="white" isSmall={smVW} />
      ) : (
        <NavbarLogo color="blue" isSmall={smVW} />
      )}

      <Burger
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        backgroundColor={mobileNavOpen || !transparent ? colors.gray[500] : 'white'}
        mobileNavOpen={mobileNavOpen}
      />
      <NavItems isNavTransparent={transparent} mobileNavOpen={mobileNavOpen} navItems={NAV_ITEMS} />
    </Box>
  );
};

export default NavBar;
