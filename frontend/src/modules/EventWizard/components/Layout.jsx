import { styled } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';

const Main = styled('main')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

/**
 * @description Layout for Event wizard pages
 * @param {{children: React.ReactNode}} props
 * @returns {React.Component}
 */
const Layout = (props) => {
  return (
    <>
      <Main sx={{ marginLeft: '200px' }}>{props.children}</Main>
      <Sidebar />
    </>
  );
};

export default Layout;
