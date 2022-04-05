import { useBoolean } from '$lib/utils/useBoolean';
import { useDeleteEvent } from '../utils/useDeleteEvent';
import { Box, Button } from '@mui/material';
import React from 'react';
import Modal from '../components/Modal';
import { colors, typography } from '$lib/theme';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './TopBar';
import { useSaveAsDraft } from '../utils/useSaveAsDraft';

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

  const { saveAsDraft } = useSaveAsDraft({
    pathAfterUpdate: '/admin/events/',
  });

  const { deleteEvent } = useDeleteEvent(eventId);

  return (
    <>
      <TopBar sidebar={!pastevent}>
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
          onClick: warning ? deleteEvent : saveAsDraft,
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
