import { styled } from '@mui/material';
import React from 'react';
import Sidebar from './SideBar';

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
      <Main sx={{ marginLeft: props.sidebar ? '200px' : '0px' }}>{props.children}</Main>
      {props.sidebar ? <Sidebar /> : null}
    </>
  );
};

export default Layout;
