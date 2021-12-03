import React from 'react';
import { styled, Box, ButtonUnstyled } from '@mui/material';

const Container = styled(Box)(({ theme, bgColor, mobileNavOpen }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'end',
    cursor: 'pointer',
    height: '20px',
    margin: 'auto 0',
    zIndex: 10,
  },
  display: 'none',
  '.burger-line': {
    zIndex: 10,
    backgroundColor: bgColor,
    height: '2px',
    width: mobileNavOpen ? '20px' : '14px',
    transition: 'all 0.2s linear',
  },
}));

/**
 * @type {(props: {
 *  onClick: () => void,
 * backgroundColor: string,
 * mobileNavOpen: boolean,
 * }) => JSX.Element}
 */
const Burger = ({ backgroundColor, mobileNavOpen, onClick }) => {
  return (
    <Container onClick={onClick} bgColor={backgroundColor} mobileNavOpen={mobileNavOpen}>
      <Box
        className="burger-line"
        component="div"
        sx={{
          transform: mobileNavOpen ? 'rotate(45deg)' : 'rotate(0)',
          transformOrigin: '0',
        }}
      />
      <Box
        className="burger-line"
        component="div"
        sx={{
          opacity: mobileNavOpen ? '0' : '1',
          transform: mobileNavOpen ? 'translateX(20px)' : 'translateX(0)',
        }}
        style={{ width: '20px' }}
      />
      <Box
        className="burger-line"
        component="div"
        sx={{
          transform: mobileNavOpen ? 'rotate(-45deg)' : 'rotate(0)',
          transformOrigin: '4px',
        }}
      />
    </Container>
  );
};

export default Burger;
