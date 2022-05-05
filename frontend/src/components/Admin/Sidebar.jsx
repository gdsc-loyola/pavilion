import React from 'react';
import logo from '$static/assets/pav_logo.svg';
import { Drawer, styled } from '@mui/material';
import SidebarLink from './SidebarLink';
import Mixpanel from '$lib/mixpanel';
import { useAdminUser } from '$lib/context/AdminContext';

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
  const { org } = useAdminUser();
  return (
    <>
      <Container variant="persistent" anchor="left" open>
        <img src={logo} alt="Logo" className="logo" />
        <div className="sidebar-links">
          <SidebarLink
            onClick={Mixpanel.track(`${org.name} viewed Dashboard`, {
              viewedOn: new Date().toISOString().split('T')[0],
            })}
            href="/admin"
            label="Dashboard"
          />
          <SidebarLink
            onClick={Mixpanel.track(`${org.name} viewed Events`, {
              viewedOn: new Date().toISOString().split('T')[0],
            })}
            href="/admin/events"
            label="Events"
          />
          <SidebarLink
            onClick={Mixpanel.track(`${org.name} viewed Settings`, {
              viewedOn: new Date().toISOString().split('T')[0],
            })}
            href="/admin/settings"
            label="Settings"
          />
        </div>
      </Container>
    </>
  );
};

export default Sidebar;
