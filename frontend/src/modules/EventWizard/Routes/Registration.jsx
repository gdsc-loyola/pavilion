import React from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { useBoolean } from '$lib/utils/useBoolean';
import { Button, Box, Typography, TextField, SvgIcon, Link } from '@mui/material';
import { colors, typography } from '$lib/theme';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
const Registration = (props) => {
  const { eventName } = useParams();
  const eventHasResponses = details.acceptingResponses;
  const [warning, setWarningState] = React.useState(true);
  const [formDescription, setFormDescription] = React.useState('');
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();

  const { details, setDetails } = useEventDetailsStore();

  const handleFormDescriptionChange = (e) => {
    setDetails({
      formDescription: e,
    });
  };

  const handleWarningState = (state) => {
    if (state == true) {
      setWarningState(true);
    } else {
      setWarningState(false);
    }
  };
  return (
    <Layout sidebar={true}>
      <TopBar eventName={eventName} sidebar={true}>
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
              handleWarningState(true);
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
              handleWarningState(false);
              openModal();
            }}
          >
            Save as draft
          </Button>
          <Button disabled={true} size="small" variant="outlined">
            Preview Webpage
          </Button>
        </Box>
      </TopBar>

      <Box
        sx={{
          marginLeft: '56px',
          marginTop: '40px',
          width: '100%',
          marginRight: '56px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '80px',
            backgroundColor: eventHasResponses ? colors.red[100] : colors.blue[100],
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <svg
            style={{ marginLeft: '32px', marginRight: '14.67px' }}
            width="32"
            height="32"
            fill="none"
          >
            <path
              d="M16 2.667C8.64 2.667 2.665 8.64 2.665 16s5.973 13.333 13.333 13.333S29.333 23.36 29.333 16 23.359 2.667 15.999 2.667Zm1.333 20h-2.667v-8h2.667v8Zm0-10.667h-2.667V9.333h2.667V12Z"
              fill={eventHasResponses ? colors.red[300] : colors.blue[300]}
            />
          </svg>
          <Typography
            sx={{
              color: eventHasResponses ? colors.red[300] : colors.blue[300],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.reg,
            }}
          >
            {eventHasResponses
              ? 'This event has responses so the form can no longer be edited.'
              : 'Basic Information cannot be edited for now. Stay tuned for future updates!'}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: colors.gray[700],
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.lg,
            marginBottom: '24px',
          }}
        >
          {eventName}
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          multiline={true}
          minRows="8"
          size="normal"
          variant="outlined"
          label="Form Description"
          helperText={`${formDescription.length}/500`}
          onChange={(e) => {
            handleFormDescriptionChange(e.target.value);
          }}
          sx={{ width: '552px', margin: '0px' }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
              marginRight: '0px',
              marginLeft: '0px',
            },
          }}
          inputProps={{ maxLength: 500 }}
          InputLabelProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              color: colors.gray[400],
            },
          }}
        />
        <Typography
          sx={{
            color: colors.gray[700],
            fontWeight: typography.fontWeight.med,
            fontSize: typography.fontSize.lg,
            marginBottom: '24px',
          }}
        >
          Basic Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '84px' }}>
          <Box>
            <Typography
              sx={{
                color: colors.gray[700],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.md,
              }}
            >
              1. ID Number
            </Typography>
            <Typography
              sx={{
                color: colors.gray[600],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.base,
              }}
            >
              ex. 123456
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: colors.gray[700],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.md,
              }}
            >
              2. Name
            </Typography>
            <Typography
              sx={{
                color: colors.gray[600],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.base,
              }}
            >
              ex. Jose P. Rizal
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: colors.gray[700],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.md,
              }}
            >
              3. Email
            </Typography>
            <Typography
              sx={{
                color: colors.gray[600],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.base,
              }}
            >
              ex. jose.rizal@obf.ateneo.edu
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: colors.gray[700],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.md,
              }}
            >
              4. Year Level
            </Typography>
            <Typography
              sx={{
                color: colors.gray[600],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.base,
              }}
            >
              ex. 1st Year
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: colors.gray[700],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.md,
              }}
            >
              5. Course
            </Typography>
            <Typography
              sx={{
                color: colors.gray[600],
                fontWeight: typography.fontWeight.reg,
                fontSize: typography.fontSize.base,
              }}
            >
              ex. BS Organization
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '72px',
          border: '1px solid #D1D5DB',
        }}
      >
        <Button href="details" size="small" sx={{ marginLeft: '56px' }}>
          <SvgIcon fontSize="small" component={KeyboardArrowLeftIcon} />
          Previous
        </Button>
      </Box>

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
          onClick: closeModal,
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
    </Layout>
  );
};

export default Registration;
