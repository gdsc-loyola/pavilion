import AdminLayout from '$components/Admin/AdminLayout';
import { styled, Grid, Button, Box } from '@mui/material';
import React, { useState } from 'react';
import Searchbar from '$components/Searchbar';
import emptyState from '$static/assets/emptyState.svg';
import { useBoolean } from '$lib/utils/useBoolean';
import Modal from '../components/Modal';
import { useForm } from 'react-hook-form';
import { useEventCreationFormStore } from '../stores/useEventCreationStore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

const ValidationSchema = yup.object().shape({
  name: yup.string().required('Event name is required'),
});

const Events = () => {
  const [searchValue, setSearchValue] = useState('');
  const { eventCreationForm, setEventCreationForm } = useEventCreationFormStore();
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { control, handleSubmit } = useForm({
    defaultValues: eventCreationForm,
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (data) => {
    setEventCreationForm({
      ...data,
    });
    // TODO: create event
  };

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
      </Container>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        asForm={true}
        TextFieldProps={{
          placeholder: 'Event Name',
          size: 'medium',
          label: 'Event Name',
          control,
          name: 'name',
        }}
        title="Create an event"
        subtitle="Fill up your webpage by adding an event for your organization."
        onSubmit={handleSubmit(onSubmit)}
        leftButtonProps={{
          label: 'Past Event',
          onClick: closeModal,
        }}
        rightButtonProps={{
          label: 'New Event',
          type: 'submit',
          href: `events/${'HEY'}`,
        }}
      />
    </AdminLayout>
  );
};

export default Events;
