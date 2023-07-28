import AdminLayout from '$components/Admin/AdminLayout';
import { styled, Grid, Button, Box, Tabs, Tab } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Searchbar from '$components/Searchbar';
import emptyState from '$static/assets/emptyState.svg';
import { useBoolean } from '$lib/utils/useBoolean';
import Modal from '../components/Modal';
import EventsTable from '../components/EventsTable';
import { useEventsStore } from '../stores/useEventsStore';
import { useAdminUser } from '$lib/context/AdminContext';
import http from '$lib/http';
import { useHistory } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 3rem',
  flex: 1,
  '.MuiButton-root': {
    fontWeight: theme.fontWeight.med,
  },
  h1: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
}));

const Events = () => {
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { events, filteredEvents, setFilteredEvents, setEvents, setSelectedEvents } =
    useEventsStore();
  const router = useHistory();

  // We're using a ref here since we don't want to rerender when changing the value
  const isCreatingRef = useRef(false);
  const [tabValue, setTabValue] = useState('Published');
  const [searchVal, setSearchVal] = useState('');

  const { org, accessToken } = useAdminUser();

  useEffect(() => {
    // setEvents(sampleRows);
    // setFilteredEvents(sampleRows);
    setEvents(org.events);
    setFilteredEvents(org.events);
  }, [org.events, setEvents, setFilteredEvents]);

  const requestSearch = useCallback(
    (val, tabVal) => {
      // TODO: Maybe implement fuzzy searching
      // Naive searching
      const filteredData = events.filter((event) => {
        if (
          tabVal === 'Published' &&
          (event.status === 'Ongoing' ||
            event.status === 'Published' ||
            event.status === 'Completed')
        ) {
          if (event.name.toLowerCase().includes(val.toLowerCase())) {
            return true;
          }
        }

        if (tabVal === event.status) {
          if (event.name.toLowerCase().includes(val.toLowerCase())) {
            return true;
          }
        }

        return false;
      });

      setFilteredEvents(filteredData);
    },
    [events, setFilteredEvents]
  );

  useEffect(() => {
    requestSearch(searchVal, tabValue);
  }, [requestSearch, searchVal, tabValue]);

  const hasEvents = events.length > 0;
  return (
    <AdminLayout>
      <Container>
        <h1>Events</h1>
        <Grid container sx={{ paddingBottom: '2em' }}>
          <Grid item xs={8} sm={5} md={6} lg={5} xl={3}>
            <Searchbar
              value={searchVal}
              size="medium"
              label="Search Events"
              placeholder="Search Events"
              onChange={(e) => {
                setSearchVal(e.target.value);
              }}
            />
          </Grid>
          <Grid item container xs={4} sm={7} md={6} lg={7} xl={9} justifyItems="flex-end">
            <Button
              onClick={openModal}
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

        {hasEvents ? (
          <>
            <Tabs
              value={tabValue}
              sx={{ paddingBottom: '2rem' }}
              onChange={(_e, newVal) => {
                setTabValue(newVal);
                setSelectedEvents('removeAll');
              }}
            >
              <Tab
                value="Draft"
                label={`Draft (${events.filter((e) => e.status === 'Draft').length})`}
              />
              <Tab
                value="Published"
                label={`Published (${
                  events.filter(
                    (e) =>
                      e.status === 'Published' || e.status === 'Ongoing' || e.status === 'Completed'
                  ).length
                })`}
              />
            </Tabs>
            <EventsTable data={filteredEvents} />
          </>
        ) : (
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
            <h4>You don&apos;t have any event yet!</h4>
            <Button onClick={openModal}>Create an event</Button>
          </Box>
        )}
      </Container>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        asForm={true}
        title="Create an event"
        subtitle="Fill up your webpage by adding an event for your organization."
        withButtons={false}
        withTextField={false}
      >
        <Grid container spacing={4} paddingTop={3}>
        {/* <Grid
          item
          xs={6}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          display="flex"
          onClick={async () => {
            // Prevent from creating multiple events;
            if (isCreatingRef.current) return;

            isCreatingRef.current = true;

            const res = await http.post(
              '/events/',
              {
                name: 'Untitled Event',
                start_date: new Date().toISOString().split('T')[0],
                end_date: new Date().toISOString().split('T')[0],
                location: '',
                desc: '',
                status: 'Completed',
                is_past_event: true,
              },
              {
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              }
            );
            isCreatingRef.current = false;

            router.push(`/admin/events/${res.data.id}/details`);
          }}
        >
          <Box
            sx={{
              background: '#F8F9FF',
              height: '140px',
              width: '200px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25);',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          ></Box>
          <p>Past Event</p>
        </Grid> */}
          <Grid
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            display="flex"
            style={{margin: 'auto'}}
            onClick={async () => {
              // Prevent from creating multiple events;
              if (isCreatingRef.current) return;

              isCreatingRef.current = true;

              const res = await http.post(
                '/events/',
                {
                  name: 'Untitled Event',
                  start_date: new Date().toISOString().split('T')[0],
                  end_date: new Date().toISOString().split('T')[0],
                  location: '',
                  desc: '',
                  status: 'Draft',
                },
                {
                  headers: {
                    authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              isCreatingRef.current = false;

              router.push(`/admin/events/${res.data.id}/details`);
            }}
          >
            <Box
              sx={{
                background: '#F8F9FF',
                height: '140px',
                width: '200px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25);',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            ></Box>
            <p>New Event</p>
          </Grid>
        </Grid>
      </Modal>
    </AdminLayout>
  );
};

export default Events;
