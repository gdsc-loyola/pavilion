import AdminLayout from '$components/Admin/AdminLayout';
import { styled, Grid, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import Searchbar from '$components/Searchbar';
import emptyState from '$static/assets/emptyState.svg';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 3rem',
  flex: 1,
  '.MuiButton-root': {
    textTransform: 'none',
    fontWeight: theme.fontWeight.med,
  },
  h1: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
}));

const Events = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <AdminLayout>
      <Container>
        <h1>Events</h1>
        <Grid container>
          <Grid item xs={4} xl={3}>
            <Searchbar
              size="medium"
              label="Search Events"
              placeholder="Search Events"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
          <Grid item container xs={8} xl={9} justifyItems="flex-end">
            <Button
              size="small"
              sx={{
                height: '100%',
                marginLeft: 'auto',
              }}
            >
              Create an event
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={(theme) => ({
            marginTop: '3rem',
            marginBottom: '4rem',
            padding: '3rem',
            backgroundColor: theme.colors.blue[50],
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '2rem',
            height: '100%',
            flex: 1,
            h4: {
              fontSize: theme.fontSize.md,
              fontWeight: theme.fontWeight.med,
            },
          })}
        >
          <img src={emptyState} style={{ width: '400px' }} />
          <h4>You don’t have any event yet!</h4>
          <Button>Create an event</Button>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default Events;
