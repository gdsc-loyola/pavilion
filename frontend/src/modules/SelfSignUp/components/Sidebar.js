import React from 'react';

import { styled } from '@mui/material/styles';
import { colors } from '$lib/theme';

const StyledSidebar = styled('aside')(({ theme }) => ({
  backgroundColor: colors.gray[100],
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const BlueEllipse = styled('div')(({}) => ({
  background: `linear-gradient(90deg, ${colors.blue[100]} 0%,${colors.blue[300]} 100%)`,
  position: 'fixed',
  bottom: '-355px',
  left: '-260px',
  width: '40%',
  height: '80%',
  maxWidth: '512px',
  maxHeight: '520px',
  borderRadius: '999px',
}));

const SideBar = () => {
  return (
    <StyledSidebar>
      <img
        src="../static/assets/pav_logo.png"
        alt="Pavilion logo"
        width="50%"
        style={{ marginBottom: '40px' }}
      />
      <img src="../static/assets/side_bar.svg" alt="" width="90%" />
      <BlueEllipse />
    </StyledSidebar>
  );
};

export default SideBar;
