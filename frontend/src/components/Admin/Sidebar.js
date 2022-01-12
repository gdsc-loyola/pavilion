import React from 'react';
import logo from '$static/assets/pav_logo.svg';
import { Drawer, styled } from '@mui/material';
import SidebarLink from './SidebarLink';

const Container = styled(Drawer)(({ theme }) => ({
  backgroundColor: theme.colors.blue[300],
  height: '100vh',
  position: 'fixed',
  zIndex: 1,
  '& .MuiDrawer-paper': {
    backgroundColor: theme.colors.blue[300],
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',

    '& .logo': {
      padding: '3rem 2rem',
    },
    '& .sidebar-links': {
      paddingTop: '3rem',
      display: 'flex',
      flexDirection: 'column',
    },
  },
}));

const Sidebar = () => {
  return (
    <>
      <Container variant="persistent" anchor="left" open>
        <img src={logo} alt="Logo" className="logo" />
        <div className="sidebar-links">
          <SidebarLink href="/admin" label="Dashboard" />
          <SidebarLink href="/admin/events" label="Events" />
          <SidebarLink href="/admin/settings" label="Settings" />
        </div>
      </Container>
    </>
  );
};

export default Sidebar;
