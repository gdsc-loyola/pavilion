import React from 'react';
import AdminLayout from '$components/Admin/AdminLayout';
import { Button, Container as C, styled } from '@mui/material';

import dashboardEmpty from '$static/assets/dashboard_empty.svg';
import { useHistory } from 'react-router-dom';
import { useAdminUser } from '$lib/context/AdminContext';

const Container = styled(C)(({ theme }) => ({
  display: 'grid',
  placeItems: 'center',
  height: '100%',
  flex: 1,
  padding: '3rem 1rem',
  div: {
    margin: 'auto',
    paddingBottom: '2rem',
    h2: {
      fontSize: '40px',
      color: theme.colors.blue[300],
    },
    p: {
      maxWidth: '65ch',
      fontSize: '20px',
    },
    '.btn-container': {
      display: 'flex',
      gap: '1rem',
      marginTop: '3rem',
      button: {
        padding: '.8rem 1.4rem',
      },
    },
  },
}));

const DashboardPage = () => {
  const { org } = useAdminUser();
  const router = useHistory();
  return (
    <AdminLayout>
      <Container>
        <div>
          <img src={dashboardEmpty} alt="" />
          <h2>Your dashboard&apos;s coming soon 😉</h2>
          <p>
            We&apos;re still working on creating a big experience for you and your organization. For
            now, try adding a past event to your organization&apos;s web page!
          </p>
          <div className="btn-container">
            <Button variant="contained" onClick={() => router.push('/admin/events')}>
              Create an event
            </Button>

            <Button
              variant="outlined"
              onClick={() => router.push(`/organizations/${org.short_name}`)}
            >
              View my webpage
            </Button>
          </div>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default DashboardPage;
