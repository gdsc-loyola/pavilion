import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Drawer, styled, Typography } from '@mui/material';
import { colors } from '$lib/theme';

import BackArrowIcon from './BackArrowIcon';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';

const Sidebar = () => {
  const path = window.location.pathname;
  const { eventName } = useParams();

  const Container = styled(Drawer)(({ theme }) => ({
    backgroundColor: theme.colors.blue[50],
    height: '100vh',
    position: 'fixed',
    zIndex: 1,
    '& .MuiDrawer-paper': {
      backgroundColor: theme.colors.blue[50],
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem 0',
      borderRight: 'none',

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

  return (
    <Container variant="persistent" anchor="left" open>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link
          to="/admin/events"
          style={{
            display: 'flex',
            gap: '4px',
            color: colors.gray[400],
            margin: 'auto',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <BackArrowIcon />
          Back to events
        </Link>

        <Typography
          variant="h6"
          sx={{
            margin: '64px auto 48px auto',
          }}
        >
          Manage Event
        </Typography>

        <SidebarSection name="CREATE">
          <SidebarLink
            active={path.includes('/details')}
            href={`/admin/events/${eventName}/details`}
            label="Event Details"
          />
          <SidebarLink
            active={path.includes('/registration')}
            href={`/admin/events/${eventName}/registration`}
            label="Registration"
          />
        </SidebarSection>

        <SidebarSection name="TRACK">
          <SidebarLink
            active={path.includes('/responses')}
            href={`/admin/events/${eventName}/responses`}
            label="Responses"
          />
        </SidebarSection>
      </div>
    </Container>
  );
};

export default Sidebar;
