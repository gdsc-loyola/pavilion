import React from 'react';
import { NavLink } from 'react-router-dom';

import { styled } from '@mui/material';

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  padding: '1.6rem 2rem',
  textDecoration: 'none',
  color: '#fff',
  transition: 'all 0.2s ease-in',
  '&:hover': {
    backgroundColor: theme.colors.blue[400],
  },
}));

/**
 * @param {{label: string, href: string}} props
 * @returns {React.Component}
 */
const SidebarLink = ({ label, href }) => {
  return (
    <StyledNavLink
      to={href}
      exact
      activeStyle={{
        backgroundColor: '#1A73E8',
      }}
    >
      {label}
    </StyledNavLink>
  );
};

export default SidebarLink;
