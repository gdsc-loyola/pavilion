import React from 'react';
import { TextField, FormHelperText, Typography, Box } from '@mui/material';
import { colors, typography } from '$lib/theme';
import { useRegistrationStore } from '../store/useRegistrationStore';
const TextFieldWithSubtitle = ({ subtitleText, label, maxLength, changeFunction }) => {
  const { registration, setRegistration } = useRegistrationStore();

  const handleIDNumberChange = (e) => {
    setRegistration({
      idnumber: e,
    });
  };

  const handleNameChange = (e) => {
    setRegistration({
      name: e,
    });
  };

  const handleEmailChange = (e) => {
    setRegistration({
      email: e,
    });
  };

  let value = '';
  if (label == 'ID Number') {
    changeFunction = (e) => handleIDNumberChange(e);
    value = registration.idnumber;
  } else if (label == 'Name') {
    changeFunction = (e) => handleNameChange(e);
    value = registration.name;
  } else if (label == 'Email') {
    changeFunction = (e) => handleEmailChange(e);
    value = registration.email;
  }

  return (
    <>
      <TextField
        margin="none"
        size="small"
        value={value}
        variant="outlined"
        label={label}
        onChange={(e) => {
          changeFunction(e.target.value);
        }}
        sx={{ marginTop: '24px', marginBottom: '0px', width: '466px' }}
        inputProps={{ maxLength: maxLength }}
        InputLabelProps={{
          sx: {
            fontWeight: typography.fontWeight.reg,
            color: colors.gray[400],
          },
        }}
      />
      <FormHelperText>
        <Box
          sx={{
            width: '464px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: 'fit-content',
            }}
          >
            <Typography
              display="inline"
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '0.75rem',
                textAlign: 'left',
              }}
            >
              <svg
                style={{ verticalAlign: 'middle', marginRight: '6.67px' }}
                width="12"
                height="12"
                fill="none"
                s
              >
                <path
                  d="M6 .833a5.167 5.167 0 1 0 .002 10.335A5.167 5.167 0 0 0 6.001.833Zm0 2.292a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75Zm1.167 5.292a.25.25 0 0 1-.25.25H5.084a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h.25V6.333h-.25a.25.25 0 0 1-.25-.25v-.5a.25.25 0 0 1 .25-.25h1.333a.25.25 0 0 1 .25.25v2.084h.25a.25.25 0 0 1 .25.25v.5Z"
                  fill="#498AF4"
                />
              </svg>
              {subtitleText}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 'fit-content',
            }}
          >
            <Typography
              display="inline-block"
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '0.75rem',
                textAlign: 'right',
              }}
            >
              {`${value.length}/${maxLength}`}
            </Typography>
          </Box>
        </Box>
      </FormHelperText>
    </>
  );
};

export default TextFieldWithSubtitle;
