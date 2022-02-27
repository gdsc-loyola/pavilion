import AdminLayout from '$components/Admin/AdminLayout';
import { styled, Grid, Button, Box, Tabs, Tab } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Searchbar from '$components/Searchbar';
import emptyState from '$static/assets/emptyState.svg';
import { useBoolean } from '$lib/utils/useBoolean';
import Modal from '../components/Modal';
import EventsTable from '../components/EventsTable';
import { useEventsStore } from '../stores/useEventsStore';
import { useAdminUser } from '$lib/context/AdminContext';

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
const sampleRows = [
  {
    id: '1',
    name: 'Tech Everywhere 2020',
    status: 'Draft',
    start_date: '2020-12-02',
    last_updated: '2020-12-02',
  },
  {
    id: '2',
    name: 'Hackathon',
    status: 'Draft',
    start_date: '2020-12-02',
    last_updated: '2021-08-02',
  },
  {
    id: '3',
    name: 'IM Summit',
    status: 'Published',
    start_date: '2022-01-01',
    last_updated: '2022-01-02',
  },
  {
    id: '4',
    name: 'Tambayan Session',
    status: 'Ongoing',
    start_date: '2021-01-01',
    end_date: '2020-01-01',
    last_updated: '2022-01-02',
  },
  {
    id: '5',
    name: 'Blue Hacks',
    status: 'Draft',
    start_date: '2021-01-01',
    end_date: '2020-01-01',
    last_updated: '2022-01-08',
  },
  {
    id: '6',
    name: 'A cool event that you should definitely attend',
    status: 'Draft',
    start_date: '2020-01-01',
    end_date: '2020-01-01',
    last_updated: '2022-02-01',
  },
];

const Events = () => {
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { events, filteredEvents, setFilteredEvents, setEvents, setSelectedEvents } =
    useEventsStore();
  const [tabValue, setTabValue] = useState('Published');
  const [searchVal, setSearchVal] = useState('');

  const { org } = useAdminUser();

  useEffect(() => {
    setEvents(sampleRows);
    setFilteredEvents(sampleRows);
    // setEvents(org.events);
    // setFilteredEvents(org.events);
  }, [org.events, setEvents, setFilteredEvents]);

  const requestSearch = useCallback(
    (val, tabVal) => {
      // TODO: Maybe implement fuzzy searching
      // Naive searching
      const filteredData = events.filter((event) => {
        if (
          tabVal === 'Published' &&
          (event.status === 'Ongoing' || event.status === 'Published')
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
                  events.filter((e) => e.status === 'Published' || e.status === 'Ongoing').length
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
          <Grid
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            display="flex"
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
          </Grid>
          <Grid
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            display="flex"
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
