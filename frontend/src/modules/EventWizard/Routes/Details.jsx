import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Layout from '../components/Layout';
import LinkIcon from '../components/LinkIcon';
import DownloadIcon from '../components/DownloadIcon';
import { Button, Box, styled, Typography, Stack, TextField, SvgIcon } from '@mui/material';
import { colors, typography } from '$lib/theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

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
    height: 'auto',
    maxWidth: '552px',
  },
});

const HelperText = styled('p')({
  color: colors.gray['500'],
  margin: 0,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.reg,
});

const Details = () => {
  const { eventName } = useParams();
  const [details, setDetails] = React.useState({
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    coverphoto: null,
    eventphoto1: null,
    eventphoto2: null,
    eventphoto3: null,
    eventphoto4: null,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, imageID) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('image')) {
      if (imageID == 1) {
        handleCoverPhotoChange(file);
      } else if (imageID == 2) {
        handleEventPhoto1Change(file);
      } else if (imageID == 3) {
        handleEventPhoto2Change(file);
      } else if (imageID == 4) {
        handleEventPhoto3Change(file);
      } else if (imageID == 5) {
        handleEventPhoto4Change(file);
      }
    }
  };

  const handleCoverPhotoChange = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        coverphoto: e,
      };
    });
  };

  const handleEventPhoto1Change = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        eventphoto1: e,
      };
    });
  };

  const handleEventPhoto2Change = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        eventphoto2: e,
      };
    });
  };

  const handleEventPhoto3Change = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        eventphoto3: e,
      };
    });
  };

  const handleEventPhoto4Change = (e) => {
    setDetails((prevState) => {
      return {
        ...prevState,
        eventphoto4: e,
      };
    });
  };

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

  const coverphoto =
    typeof details.coverphoto?.name == 'string' ? URL.createObjectURL(details.coverphoto) : null;
  const eventphoto1 =
    typeof details.eventphoto1?.name == 'string' ? URL.createObjectURL(details.eventphoto1) : null;
  const eventphoto2 =
    typeof details.eventphoto2?.name == 'string' ? URL.createObjectURL(details.eventphoto2) : null;
  const eventphoto3 =
    typeof details.eventphoto3?.name == 'string' ? URL.createObjectURL(details.eventphoto3) : null;
  const eventphoto4 =
    typeof details.eventphoto4?.name == 'string' ? URL.createObjectURL(details.eventphoto4) : null;
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
        <Typography
          sx={{
            color: colors.gray[700],
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.lg,
            marginBottom: '24px',
          }}
        >
          Event Details
        </Typography>

        <input
          type="file"
          accept="image/*"
          id="cover-photo"
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
            onDrop={(e) => handleDrop(e, 1)}
          >
            <img
              src={coverphoto ? coverphoto : '../../../../static/assets/image.png'}
              alt="coverPhoto"
              width={coverphoto ? '80%' : '70px'}
              style={{ maxHeight: '208px' }}
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
          helperText={`${details.location.length}/100`}
          onChange={(e) => {
            handleLocationChange(e.target.value);
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
            },
          }}
          inputProps={{ maxLength: 100 }}
        />
        <TextField
          margin="normal"
          fullWidth
          multiline={true}
          minRows="8"
          size="normal"
          variant="outlined"
          label="Describe this event!"
          helperText={`${details.description.length}/100`}
          onChange={(e) => {
            handleDescriptionChange(e.target.value);
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
            },
          }}
          inputProps={{ maxLength: 100 }}
        />
      </Box>
      <Box
        sx={{
          marginLeft: '56px',
          marginRight: '56px',
          marginTop: '104px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: colors.gray[700],
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.lg,
          }}
        >
          Event Photos
        </Typography>
        <Typography
          sx={{
            marginTop: '8px',
            color: colors.gray[400],
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.reg,
          }}
        >
          Upload up to 4 images to showcase your event!
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            marginTop: '24px',
            marginBottom: '24px',
          }}
        >
          <input
            type="file"
            accept="image/*"
            id="eventphoto1"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleEventPhoto1Change(e.target.files[0]);
            }}
          />
          <Stack sx={{ textAlign: 'center' }} spacing={1}>
            <Label
              sx={{ width: '552px', height: '400px' }}
              htmlFor="eventphoto1"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, 2)}
            >
              <img
                src={eventphoto1 ? eventphoto1 : '../../../../static/assets/image.png'}
                alt="eventPhoto1"
                width={eventphoto1 ? '80%' : '70px'}
                style={{ maxHeight: '400px' }}
              />
              {!eventphoto1 && (
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
            <HelperText>Suggested ratio — 3:2 (ex. 1080x720)</HelperText>
          </Stack>
          <input
            type="file"
            accept="image/*"
            id="eventphoto2"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleEventPhoto2Change(e.target.files[0]);
            }}
          />
          <Stack sx={{ textAlign: 'center' }} spacing={1}>
            <Label
              sx={{ width: '552px', height: '400px' }}
              htmlFor="eventphoto2"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, 3)}
            >
              <img
                src={eventphoto2 ? eventphoto2 : '../../../../static/assets/image.png'}
                alt="eventPhoto2"
                width={eventphoto2 ? '80%' : '70px'}
                style={{ maxHeight: '400px' }}
              />
              {!eventphoto2 && (
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
            <HelperText>Suggested ratio — 3:2 (ex. 1080x720)</HelperText>
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '24px', marginBottom: '135px' }}>
          <input
            type="file"
            accept="image/*"
            id="eventphoto3"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleEventPhoto3Change(e.target.files[0]);
            }}
          />
          <Stack sx={{ textAlign: 'center' }} spacing={1}>
            <Label
              sx={{ width: '552px', height: '400px' }}
              htmlFor="eventphoto3"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, 4)}
            >
              <img
                src={eventphoto3 ? eventphoto3 : '../../../../static/assets/image.png'}
                alt="eventPhoto3"
                width={eventphoto3 ? '80%' : '70px'}
                style={{ maxHeight: '400px' }}
              />
              {!eventphoto3 && (
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
            <HelperText>Suggested ratio — 3:2 (ex. 1080x720)</HelperText>
          </Stack>
          <input
            type="file"
            accept="image/*"
            id="eventphoto4"
            style={{ display: 'none' }}
            onChange={(e) => {
              handleEventPhoto4Change(e.target.files[0]);
            }}
          />
          <Stack sx={{ textAlign: 'center' }} spacing={1}>
            <Label
              sx={{ width: '552px', height: '400px' }}
              htmlFor="eventphoto4"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e, 5)}
            >
              <img
                src={eventphoto4 ? eventphoto4 : '../../../../static/assets/image.png'}
                alt="eventPhoto4"
                width={eventphoto4 ? '80%' : '70px'}
                style={{ maxHeight: '400px' }}
              />
              {!eventphoto4 && (
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
            <HelperText>Suggested ratio — 3:2 (ex. 1080x720)</HelperText>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '72px',
          border: '1px solid #D1D5DB',
        }}
      >
        <Button size="small" sx={{ marginRight: '56px' }}>
          Next
          <SvgIcon fontSize="small" component={KeyboardArrowRightIcon} />
        </Button>
      </Box>
    </Layout>
  );
};

export default Details;
