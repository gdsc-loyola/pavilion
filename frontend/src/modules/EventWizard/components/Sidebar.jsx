import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Drawer, styled, Typography } from '@mui/material';
import { colors } from '$lib/theme';

import BackArrowIcon from './BackArrowIcon';
import SidebarSection from './SidebarSection';
import SidebarLink from './SidebarLink';
import { useEventDetailsStore } from '../store/useEventDetailsStore';

const Sidebar = () => {
  const path = window.location.pathname;
  const { id: eventId } = useParams();
  const { details } = useEventDetailsStore();

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
            marginTop: '1.4rem',
          }}
        >
          <BackArrowIcon />
          Back to events
        </Link>

        <Typography
          variant="h6"
          sx={{
            margin: '80px auto 48px auto',
          }}
        >
          Manage Event
        </Typography>

        <SidebarSection name="CREATE">
          <SidebarLink
            active={path.includes('/details')}
            href={`/admin/events/${eventId}/details`}
            label="Event Details"
          />
          {/* {!details.is_past_event && (
            <SidebarLink
              active={path.includes('/registration')}
              href={`/admin/events/${eventId}/registration`}
              label="Registration"
            />
          )} */}
        </SidebarSection>

        {/* {!details.is_past_event && (
          <SidebarSection name="TRACK">
            <SidebarLink
              active={path.includes('/responses')}
              href={`/admin/events/${eventId}/responses`}
              label="Responses"
            />
          </SidebarSection>
        )} */}
      </div>
    </Container>
  );
};

export default Sidebar;
