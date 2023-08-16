import { useBoolean } from '$lib/utils/useBoolean';
import { useDeleteEvent } from '../utils/useDeleteEvent';
import { Box, Button } from '@mui/material';
import * as mui from '@mui/material';
import React, { useState } from 'react';
import Modal from '../components/Modal';
import { colors, typography } from '$lib/theme';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './TopBar';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import { useSaveAsDraft } from '../utils/useSaveAsDraft';
import { hasDetailsExceptEventPhotos } from '../utils/hasProperties';
import Banner from './Banner';

/**
 *
 * @param {{
 * pastevent: boolean,
 * }} props
 * @returns
 */
const Header = (props) => {
  const { id: eventId } = useParams();
  //const { pastevent } = props;

  const router = useHistory();

  const [warning, setWarningState] = React.useState(true);
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { details } = useEventDetailsStore();

  const [open, setOpen] = useState(false);
  const [errorname, setError] = useState('');

  const { saveAsDraft } = useSaveAsDraft({
    pathAfterUpdate: '/admin/events/',
  });

  const { deleteEvent } = useDeleteEvent(eventId);

  const canPreview = hasDetailsExceptEventPhotos(
    details,
    details.is_past_event ? ['formDescription'] : []
  );
  return (
    <>
      {/* Error Message using MUI Modals */}

      {/* <mui.Modal
      open={open}
      onClose={() => setOpen(false)}
      >
        <Box style={{position: 'absolute', borderRadius: '9px', boxShadow: '0 0 10px #000c', minWidth: '50vw', color: 'white', textAlign: 'center', maxWidth: '50vw', backgroundColor: 'red', padding: '30px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%'}}>
          {errorname}
        </Box>

      </mui.Modal> */}

      <Banner show={open} warning={true} label={errorname} />

      <TopBar sidebar>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Button
            size="small"
            style={{
              borderColor: colors.red[300],
              color: colors.red[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            variant="outlined"
            onClick={() => {
              setWarningState(true);
              openModal();
            }}
          >
            Discard
          </Button>
          <Button
            size="small"
            style={{
              borderColor: colors.blue[300],
              color: colors.blue[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            variant="outlined"
            onClick={() => {
              setWarningState(false);
              openModal();
            }}
          >
            Save as draft
          </Button>
          <Button
            style={{
              borderColor: colors.blue[300],
              color: colors.blue[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            disabled={!canPreview}
            onClick={() => {
              saveAsDraft().then((e) => {
                if (e === undefined){
                  return router.push('preview')
                } else if (e.result === 'ERROR') {
                  console.log(e)
                  if (e.error === 'name') {
                    setError('You must provide an Event Name');
                  } else if (e.error === 'desc') {
                    setError('You must provide an Event Description');
                  } else if (e.error === 'start_date') {
                    setError('You must provide a valid Start Date for the Event');
                  } else if (e.error === 'end_date') {
                    setError('You must provide a valid End Date for the Event');
                  } else if (e.error === 'location') {
                    setError('You must provide an Event Location');
                  }
                  setOpen(true);
                }
              })
              
            
            }}
            size="small"
            variant="outlined"
          >
            Preview Webpage
          </Button>
        </Box>
      </TopBar>
      <Modal
        withTextField={false}
        warning={warning}
        open={isModalOpen}
        onClose={closeModal}
        asForm={true}
        title={warning ? 'Discard Event' : 'Close and save as draft'}
        subtitle={
          warning
            ? 'This will delete all the information you’ve added so far.'
            : 'You can go back to editing this event anytime.'
        }
        leftButtonProps={{
          label: 'Never Mind',
          onClick: closeModal,
          sx: {
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.med,
          },
        }}
        rightButtonProps={{
          label: warning ? 'Discard Event' : 'Save as draft',
          onClick: () => {
            if (warning) {
              deleteEvent();
            } else {
              saveAsDraft().then((e) => {
                console.log(e);
                if (e === undefined) {
                  return router.push('/admin/events');
                } else if (e.result === 'ERROR') {
                  closeModal();

                  if (e.error === 'name') {
                    setError('You must provide an Event Name');
                  } else if (e.error === 'desc') {
                    setError('You must provide an Event Description');
                  } else if (e.error === 'start_date') {
                    setError('You must provide a valid Start Date for the Event');
                  } else if (e.error === 'end_date') {
                    setError('You must provide a valid End Date for the Event');
                  } else if (e.error === 'location') {
                    setError('You must provide an Event Location');
                  }
                  setOpen(true);
                }
              });
            }
          },
          sx: {
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.med,
            color: '#FFF',
            background: warning
              ? colors.red[300]
              : 'linear-gradient(90deg, #498af4 0%, #1a73e8 100%)',
            ':hover': {
              background: warning
                ? colors.red[300]
                : 'linear-gradient(90deg, #498af4 0%, #1a73e8 100%)',
            },
          },
        }}
      />
    </>
  );
};

export default Header;
