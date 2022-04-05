import React from 'react';
import Layout from '../components/Layout';
import { Button, Box, Typography, TextField, SvgIcon } from '@mui/material';
import { colors, typography } from '$lib/theme';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useEvent } from '../utils/useEvent';
const Registration = () => {
  const { id: eventId } = useParams();
  const { details, setDetails } = useEventDetailsStore();

  const eventHasResponses = details.acceptingResponses;

  useEvent(eventId);

  const handleFormDescriptionChange = (e) => {
    setDetails({
      formDescription: e,
    });
  };

  return (
    <Layout sidebar={true}>
      <Header pathAfterUpdate="preview" />

      <Box
        sx={{
          marginLeft: '56px',
          marginTop: '40px',
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
          {details.name} Registration Form
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          multiline={true}
          minRows="8"
          size="normal"
          variant="outlined"
          label="Form Description"
          helperText={`${details.formDescription.length}/500`}
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
          value={details.formDescription}
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
    </Layout>
  );
};

export default Registration;
