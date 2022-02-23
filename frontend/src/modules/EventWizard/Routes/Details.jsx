import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Layout from '../components/Layout';
import LinkIcon from '../components/LinkIcon';
import DownloadIcon from '../components/DownloadIcon';
import { Button, Box, styled, Typography, Stack, TextField } from '@mui/material';
import { colors, typography } from '$lib/theme';

const Label = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '80vw',
  border: `1px dashed ${colors.blue['400']}`,
  borderRadius: '2px',
  backgroundColor: colors.blue['50'],
  transitionDuration: '0.2s',
  fontFamily: 'inherit',
  color: colors.blue['400'],
  '&:hover': {
    backgroundColor: colors.gray['300'],
  },
  img: {
    width: '70px',
    height: 'auto',
    maxWidth: '24%',
  },
});

const HelperText = styled('p')({
  color: colors.gray['500'],
  margin: 0,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.reg,
});
const coverphoto = null;

const Details = () => {
  const { eventName } = useParams();
  const [details, setDetails] = React.useState({
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    coverphoto: '',
    eventphoto1: '',
    eventphoto2: '',
    eventphoto3: '',
    eventphoto4: '',
  });

  const handleStartDateChange = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        startDate: e,
      };
    });
  };

  const handleEndDateChange = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        endDate: e,
      };
    });
  };

  const handleLocationChange = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        location: e,
      };
    });
  };

  const handleDescriptionChange = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        description: e,
      };
    });
  };

  return (
    <Layout>
      <TopBar eventName={eventName}>
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
            inputprops
            variant="outlined"
          >
            Save as draft
          </Button>
          <Button disabled={true} size="small" variant="outlined">
            Preview Webpage
          </Button>
        </Box>
      </TopBar>

      <Box sx={{ marginLeft: '56px', marginTop: '40px', width: '552px' }}>
        <Typography> Event Details </Typography>

        <input
          type="file"
          accept="image/*"
          id="cover-photo
        "
          style={{ display: 'none' }}
          onChange={(e) => {
            handleCoverPhotoChange(e.target.files[0]);
          }}
        />
        <Stack sx={{ textAlign: 'center', marginBottom: '40px' }} spacing={1}>
          <Label
            sx={{ width: '552px', height: '208px' }}
            htmlFor="cover-photo"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e)}
          >
            <img
              src={coverphoto ? coverphoto : '../../../../static/assets/image.png'}
              alt="coverPhoto"
            />
            {!coverphoto && (
              <p>
                <Typography sx={{ color: colors.gray[700] }}>
                  Drag a cover photo for your event here,
                </Typography>
                <Typography sx={{ color: colors.blue[400] }}>
                  <Typography display="inline" sx={{ color: colors.gray[700] }}>
                    or
                  </Typography>{' '}
                  browse through your files.
                </Typography>
              </p>
            )}
          </Label>
          <HelperText>Suggested ratio — 4:1 (ex. 1440x360)</HelperText>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            flexDireciton: 'row',
            alignItems: 'center',
            width: '552px',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            fullWidth
            sx={{ marginRight: '13px' }}
            size="normal"
            variant="outlined"
            label="Start date"
          />
          <Typography
            sx={{
              color: colors.gray[400],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.reg,
            }}
          >
            {' '}
            to{' '}
          </Typography>
          <TextField
            fullWidth
            sx={{ marginLeft: '13px' }}
            size="normal"
            variant="outlined"
            label="End date"
            margin="normal"
          />
        </Box>
        <TextField
          fullWidth
          size="normal"
          variant="outlined"
          label="Where was the event held?"
          helperText="0/100"
          onChange={(e) => {
            handleLocationChange(e.target.value);
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
            },
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          multiline={true}
          minRows="8"
          size="normal"
          variant="outlined"
          label="Describe this event!"
          helperText="0/100"
          onChange={(e) => {
            handleDescriptionChange(e.target.value);
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
            },
          }}
        />
      </Box>
    </Layout>
  );
};

export default Details;
