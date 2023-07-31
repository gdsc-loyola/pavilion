import { useBoolean } from '$lib/utils/useBoolean';
import { useDeleteEvent } from '../utils/useDeleteEvent';
import { Box, Button } from '@mui/material';
import React from 'react';
import Modal from '../components/Modal';
import { colors, typography } from '$lib/theme';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './TopBar';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import { useSaveAsDraft } from '../utils/useSaveAsDraft';
import { hasDetailsExceptEventPhotos } from '../utils/hasProperties';

/**
 *
 * @param {{
 * pastevent: boolean,
 * }} props
 * @returns
 */
const Header = (props) => {
  const { id: eventId } = useParams();
  const { pastevent } = props;

  const router = useHistory();

  const [warning, setWarningState] = React.useState(true);
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { details } = useEventDetailsStore();

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
            onClick={() => router.push('preview')}
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
              deleteEvent()
            } else {
              saveAsDraft()
              .then((e) => {
                if (e === 'ERROR'){
                  return closeModal()
                } else {
                  return router.push('/admin/events');
                }
                
              })
              
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
