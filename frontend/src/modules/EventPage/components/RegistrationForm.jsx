import React, { useState } from 'react';
import { Box, TextField, Typography, Autocomplete, Checkbox, Button } from '@mui/material';
import { Info } from '@mui/icons-material';
import { typography, colors } from '$lib/theme';
import { useBoolean } from '$lib/utils/useBoolean';

import DataPrivacyModal from './DataPrivacyModal';
import Modal from './Modal';

const courses = [
  'AB Art Management',
  'BFA Major in Creative Writing',
  'BFA Major in Information Design',
  'BFA Major in Theater Arts',
  'AB Humanities',
  'AB Interdisciplinary Studies',
  'AB Literature-English',
  'AB Literature-Filipino (Filipino-Panitikan)',
  'AB Philosophy',
  'BS Communications Technology Management',
  'BS Information Technology Entrepreneurship',
  'BS Legal Management',
  'BS Management',
  'BS Management (Honors)',
  'BS Management Engineering',
  'BS Management of Applied Chemistry',
  'BS Restaurant Entrepreneurship',
  'BS/M Applied Mathematics with Specialization in Mathematical Finance',
  'BS Applied Mathematics - Master in Data Science ',
  'BS Applied Physics/BS Materials Science and Engineering',
  'BS Biology',
  'BS Chemistry',
  'BS Chemistry/BS Materials Science and Engineering',
  'BS Computer Engineering',
  'BS Computer Science',
  'BS Computer Science - BS Digital Game Design and Development',
  'BS/MS Computer Science',
  'BS Electronics Engineering ',
  'BS Environmental Science',
  'BS Health Sciences',
  'BS Life Sciences',
  'BS Management Information Systems',
  'BS Management Information Systems/MS Computer Science',
  'BS Mathematics',
  'BS Physics',
  'AB Chinese Studies',
  'AB Communication',
  'AB Development Studies',
  'AB Economics',
  'AB Economics (Honors)',
  'AB Management Economics',
  'AB European Studies',
  'AB History',
  'AB Diplomacy and International Relations with Specialization in East and Southeast Asian Studies',
  'AB Political Science',
  'AB/MA Political Science – Global Politics',
  'AB Political Science – Masters in Public Management',
  'AB Psychology',
  'BS Psychology',
  'AB Sociology,',
];

const RegistrationForm = ({ openBanner, closeBanner, endRegistering, scrollToTop }) => {
  const [registrationInput, setRegistrationInput] = useState({
    idNumber: '',
    name: '',
    email: '',
    year: '',
    course: '',
    agreed: false,
  });

  const checkIfAllFilled = () => {
    const { idNumber, name, email, year, course, agreed } = registrationInput;
    return idNumber && name && email && year && course && agreed;
  };

  const {
    value: isDataPrivacyOpen,
    setFalse: closeDataPrivacy,
    setTrue: openDataPrivacy,
  } = useBoolean();

  const {
    value: isConfirmationOpen,
    setFalse: closeConfirmation,
    setTrue: openConfirmation,
  } = useBoolean();

  const onSubmit = (e) => {
    e.preventDefault();
    alert('submit');
    closeConfirmation();
    endRegistering();
    scrollToTop();
    openBanner();
    setTimeout(() => {
      closeBanner();
    }, 3500);
  };

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        maxWidth: '760px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        borderTop: `1px solid ${colors.gray[300]}`,
        paddingTop: '32px',
        marginBottom: '5rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        openConfirmation();
      }}
    >
      {/* ID Number */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '466px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="ID Number"
          type="number"
          onChange={(e) => setRegistrationInput({ ...registrationInput, idNumber: e.target.value })}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6);
          }}
          InputLabelProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              color: colors.gray[400],
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <Info sx={{ width: '16px' }} color="info" />
            <Typography
              sx={{
                fontSize: typography.fontSize.xs,
                padding: 0,
                margin: 0,
              }}
            >
              ex. 123456
            </Typography>
          </Box>
          <Typography
            sx={{
              color: colors.gray[400],
              fontSize: typography.fontSize.xs,
            }}
          >
            {registrationInput.idNumber.length}/6
          </Typography>
        </Box>
      </Box>

      {/* Name */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '466px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          type="text"
          onChange={(e) => setRegistrationInput({ ...registrationInput, name: e.target.value })}
          inputProps={{ maxLength: 100 }}
          InputLabelProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              color: colors.gray[400],
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <Info sx={{ width: '16px' }} color="info" />
            <Typography
              sx={{
                fontSize: typography.fontSize.xs,
                padding: 0,
                margin: 0,
              }}
            >
              ex. Jose Rizal
            </Typography>
          </Box>
          <Typography
            sx={{
              color: colors.gray[400],
              fontSize: typography.fontSize.xs,
            }}
          >
            {registrationInput.name.length}/100
          </Typography>
        </Box>
      </Box>

      {/* Email */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '466px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          onChange={(e) => setRegistrationInput({ ...registrationInput, email: e.target.value })}
          inputProps={{ maxLength: 100 }}
          InputLabelProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              color: colors.gray[400],
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <Info sx={{ width: '16px' }} color="info" />
            <Typography
              sx={{
                fontSize: typography.fontSize.xs,
                padding: 0,
                margin: 0,
              }}
            >
              ex. jose.rizal@obf.ateneo.edu
            </Typography>
          </Box>
          <Typography
            sx={{
              color: colors.gray[400],
              fontSize: typography.fontSize.xs,
            }}
          >
            {registrationInput.email.length}/100
          </Typography>
        </Box>
      </Box>

      {/* Year */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '466px',
        }}
      >
        <Autocomplete
          fullWidth
          variant="outlined"
          options={[
            '1st Year',
            '2nd Year',
            '3rd Year',
            '4th Year',
            '5th Year',
            '6th Year',
            '7th Year',
          ]}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Year"
              InputLabelProps={{
                sx: {
                  fontWeight: typography.fontWeight.reg,
                  color: colors.gray[400],
                },
              }}
            />
          )}
          onChange={(e, value) => setRegistrationInput({ ...registrationInput, year: value })}
        />
      </Box>

      {/* Course */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '466px',
        }}
      >
        <Autocomplete
          fullWidth
          variant="outlined"
          options={courses}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Course"
              InputLabelProps={{
                sx: {
                  fontWeight: typography.fontWeight.reg,
                  color: colors.gray[400],
                },
              }}
            />
          )}
          onChange={(e, value) => setRegistrationInput({ ...registrationInput, course: value })}
        />
      </Box>

      {/* Data Privacy Policy */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Checkbox
          checked={registrationInput.agreed}
          onChange={(e) => setRegistrationInput({ ...registrationInput, agreed: e.target.checked })}
        />
        <Typography>
          I agree to the{' '}
          <span onClick={openDataPrivacy} style={{ color: colors.blue[400], cursor: 'pointer' }}>
            Data Privacy Policy
          </span>
          .
        </Typography>
      </Box>

      <Button
        sx={{
          alignSelf: 'flex-start',
          padding: '8px 24px',
        }}
        disabled={!checkIfAllFilled()}
        type="submit"
      >
        Submit
      </Button>
      <DataPrivacyModal
        open={isDataPrivacyOpen}
        handleClose={closeDataPrivacy}
        handleDecline={() => {
          closeDataPrivacy();
          setRegistrationInput({ ...registrationInput, agreed: false });
        }}
        handleAccept={() => {
          closeDataPrivacy();
          setRegistrationInput({ ...registrationInput, agreed: true });
        }}
      />

      <Modal
        open={isConfirmationOpen}
        onClose={closeConfirmation}
        title="Submit Response"
        subtitle="You can no longer edit your response after submitting. In case of issues, please contact the respective organization."
        leftButtonProps={{
          label: 'Never mind',
          onClick: closeConfirmation,
        }}
        rightButtonProps={{
          label: 'Submit',
          onClick: (e) => onSubmit(e),
        }}
      />
    </Box>
  );
};

export default RegistrationForm;
