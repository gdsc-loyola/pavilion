import React from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useAdminUser } from '$lib/context/AdminContext';
import http from '$lib/http';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import {
  Button,
  Box,
  styled,
  Typography,
  Stack,
  TextField,
  SvgIcon,
  FormHelperText,
} from '@mui/material';
import { colors, typography } from '$lib/theme';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { safeFormDataAppend } from '$lib/utils/safeFormDataAppend';
import { isFile } from '../utils/isFile';
import Header from '../components/Header';
import { useEvent } from '../utils/useEvent';

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

const Details = (props) => {
  const { id: eventId } = props.match.params;

  const router = useHistory();
  const { accessToken } = useAdminUser();

  const { details, setDetails } = useEventDetailsStore();

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
    setDetails({
      coverphoto: e,
    });
  };

  const handleEventPhoto1Change = (e) => {
    setDetails({
      eventphoto1: e,
    });
  };

  const handleEventPhoto2Change = (e) => {
    setDetails({
      eventphoto2: e,
    });
  };

  const handleEventPhoto3Change = (e) => {
    setDetails({
      eventphoto3: e,
    });
  };

  const handleEventPhoto4Change = (e) => {
    setDetails({
      eventphoto4: e,
    });
  };

  function startdateChecker(date) {
    const last = new Date(date).toLocaleDateString();
    let cons = '';
    for (let i = last.length - 1, j = 0; j < 4; i--, j++) {
      cons += last[i];
    }
    console.log(!isNaN(date.getTime()));
    if (cons === 'etaD' || cons.includes('/') || date === 'Invalid Date') {
      console.log(`bad dates`);
      setDetails({
        startDate: 'Invalid Date',
      });
    } else {
      setDetails({
        startDate: date,
      });
    }
  }

  function enddateChecker(date) {
    const last = new Date(date).toLocaleDateString();
    let cons = '';
    for (let i = last.length - 1, j = 0; j < 4; i--, j++) {
      cons += last[i];
    }
    console.log(date);
    if (cons === 'etaD' || cons.includes('/') || date === 'Invalid Date') {
      setDetails({
        endDate: 'Invalid Date',
      });
    } else {
      setDetails({
        endDate: date,
      });
    }
  }

  const handleStartDateChange = (e) => {
    startdateChecker(e);
  };

  const handleEndDateChange = (e) => {
    enddateChecker(e);
  };

  const handleLocationChange = (e) => {
    setDetails({
      location: e,
    });
  };

  const handleDescriptionChange = (e) => {
    setDetails({
      description: e,
    });
  };

  const handleResponsesSheetChange = (e) => {
    setDetails({
      responsesSheet: e,
    });
  };

  const isURLHttps = (url) => {
    if (!url) return null;

    if (url instanceof File) {
      return URL.createObjectURL(url);
    } else if (url === null) {
      return null;
    } else if (url.includes('http')) {
      return url;
    } else {
      return URL.createObjectURL(url);
    }
  };
  const coverphoto = isURLHttps(details.coverphoto);
  const eventphoto1 = isURLHttps(details.eventphoto1);
  const eventphoto2 = isURLHttps(details.eventphoto2);
  const eventphoto3 = isURLHttps(details.eventphoto3);
  const eventphoto4 = isURLHttps(details.eventphoto4);

  useEvent(eventId);

  // const pushDetails = async () => {
  //   const fd = new FormData();
  //   fd.append('desc', details.description);
  //   safeFormDataAppend(fd, 'cover_photo', details.coverphoto, isFile);
  //   safeFormDataAppend(fd, 'event_photo1', details.eventphoto1, isFile);
  //   safeFormDataAppend(fd, 'event_photo2', details.eventphoto2, isFile);
  //   safeFormDataAppend(fd, 'event_photo3', details.eventphoto3, isFile);
  //   safeFormDataAppend(fd, 'event_photo4', details.eventphoto4, isFile);

  //   fd.append('location', details.location);
  //   fd.append('name', details.name);
  //   fd.append('start_date', details.startDate);
  //   fd.append('end_date', details.endDate);
  //   var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  //   fd.append('last_updated', utc);
  //   fd.append('status', 'Draft');
  //   fd.append('accepting_responses', details.acceptingResponses);
  //   fd.append('is_past_event', details.is_past_event);
  //   fd.append('old_respondents', details.responsesSheet);
  //   fd.append('form_description', details.formDescription);
  //   await http.put(`events/${eventId}/`, fd, {
  //     headers: {
  //       authorization: `Bearer ${accessToken}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   router.push('registration');
  // };
  return (
    <Layout>
      <Header pastevent={details.is_past_event} />

      <Box
        sx={{
          marginLeft: '56px',
          marginTop: '40px',
          width: '552px',
        }}
      >
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={details.startDate}
              label="Start date"
              onChange={(e) => {
                handleStartDateChange(e);
              }}
              renderInput={(params) => (
                <TextField
                  error={details.startDate === 'Invalid Date' || details.startDate === 'etaD'}
                  helperText={
                    details.startDate === 'Invalid Date' || details.startDate === 'etaD'
                      ? 'Invalid Date'
                      : ''
                  }
                  fullWidth
                  size="normal"
                  variant="outlined"
                  id="standard-error-helper-text"
                  sx={{
                    fontWeight: typography.fontWeight.reg,
                    color: colors.gray[400],
                    marginRight: '13px',
                    marginBottom: '16px',
                    marginTop: '16px',
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Typography
            sx={{
              color: colors.gray[400],
              fontWeight: typography.fontWeight.reg,
            }}
          >
            to
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              sx={{ marginLeft: '13px', marginBottom: '16px', marginTop: '16px' }}
              value={details.endDate}
              label="End date"
              onChange={(e) => {
                handleEndDateChange(e);
              }}
              renderInput={(params) => (
                <TextField
                  error={details.endDate === 'Invalid Date' || details.endDate === 'etaD'}
                  helperText={
                    details.endDate === 'Invalid Date' || details.endDate === 'etaD'
                      ? 'Invalid Date'
                      : ''
                  }
                  fullWidth
                  size="normal"
                  variant="outlined"
                  sx={{
                    fontWeight: typography.fontWeight.reg,
                    color: colors.gray[400],
                    marginLeft: '13px',
                    marginBottom: '16px',
                    marginTop: '16px',
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <TextField
          fullWidth
          size="normal"
          variant="outlined"
          label="Where was the event held?"
          value={details.location}
          error={details.location.trim() === ''}
          helperText={`${details.location.trim().length !== 0 ? details.location.length : '0'}/100`}
          onChange={(e) => {
            handleLocationChange(e.target.value);
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: 'right',
              marginRight: '0px',
              marginLeft: '0px',
            },
          }}
          inputProps={{ maxLength: 100 }}
          InputLabelProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              color: colors.gray[400],
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
          value={details.description}
          error={details.description.trim().length === 0}
          helperText={`${
            details.description.trim().length === 0 ? details.description.length : '0'
          }/500`}
          onChange={(e) => {
            handleDescriptionChange(e.target.value);
          }}
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
        {details.is_past_event ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              size="normal"
              variant="outlined"
              label="Link to responses"
              value={details.responsesSheet}
              onChange={(e) => {
                handleResponsesSheetChange(e.target.value);
              }}
              sx={{ marginBottom: '0px' }}
              inputProps={{ maxLength: 500 }}
              InputLabelProps={{
                sx: {
                  fontWeight: typography.fontWeight.reg,
                  color: colors.gray[400],
                },
              }}
            />
            <FormHelperText>
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
                Sheet of registration responses for your event, if any.
              </Typography>
              <Typography
                display="inline-block"
                sx={{
                  width: '238.90px',
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.75rem',
                  textAlign: 'right',
                }}
              >
                {`${details.responsesSheet ? details.responsesSheet.length : '0'}/500`}
              </Typography>
            </FormHelperText>
          </>
        ) : null}
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
            flexWrap: 'wrap',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            marginBottom: details.is_past_event ? '135px' : '105px',
            flexWrap: 'wrap',
          }}
        >
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
      {/* {details.is_past_event ? null : (
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
          <Button onClick={pushDetails} size="small" sx={{ marginRight: '56px' }}>
            Next
            <SvgIcon fontSize="small" component={KeyboardArrowRightIcon} />
          </Button>
        </Box>
      )} */}
    </Layout>
  );
};

export default Details;
