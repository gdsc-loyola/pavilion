import { styled } from '@mui/material';
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Main = styled('main')({
  minHeight: '100vh',
  marginLeft: '200px',
  display: 'flex',
  flexDirection: 'column',
});

/**
 * @description Layout for Org-side pages
 * @param {{children: React.ReactNode}} props
 * @returns {React.Component}
 */
const AdminLayout = (props) => {
  return (
    <>
      <Main>
        <TopBar />
        {props.children}
      </Main>
      <Sidebar />
    </>
  );
};

export default AdminLayout;
