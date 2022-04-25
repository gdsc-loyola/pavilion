import React from 'react';
import Modal from '../components/Modal';
import { useBoolean } from '$lib/utils/useBoolean';
import { useHistory, useParams } from 'react-router-dom';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import EventTitleCard from '../../EventPage/components/EventTitleCard';
import DataPrivacyModal from '../components/DataPrivacyModal';
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Checkbox,
} from '@mui/material';
import ScrollToTop from '$components/ScrollToTop';
import TopBar from '../components/TopBar';
import { colors, typography, theme } from '$lib/theme';
import TextFieldWithSubtitle from '../components/TextFieldWithSubtitle';
import { useRegistrationStore } from '../store/useRegistrationStore';
import { useAdminUser } from '$lib/context/AdminContext';
import { usePublish } from '../utils/usePublish';
import { useSaveAsDraft } from '../utils/useSaveAsDraft';
import { useEvent } from '../utils/useEvent';

const Preview = () => {
  const { id: eventId } = useParams();
  const { details } = useEventDetailsStore();

  const router = useHistory();

  const { publishEvent } = usePublish({
    pathAfterUpdate: `/organizations/${details.org?.slug}/${details.id}`,
  });
  const { saveAsDraft } = useSaveAsDraft('/admin/events');

  const isURLHttps = (url) => {
    if (url instanceof File) {
      return URL.createObjectURL(url);
    } else if (url == null) {
      return null;
    } else if (url.includes('http')) {
      return url;
    } else {
      return URL.createObjectURL(url);
    }
  };
  const eventPhotos = [
    isURLHttps(details.eventphoto1),
    isURLHttps(details.eventphoto2),
    isURLHttps(details.eventphoto3),
    isURLHttps(details.eventphoto4),
  ];

  const [publish, setPublishState] = React.useState(true);

  const handlePublishState = (state) => {
    if (state == true) {
      setPublishState(true);
    } else {
      setPublishState(false);
    }
  };

  useEvent(eventId);

  const coverphoto = React.useMemo(() => isURLHttps(details.coverphoto), [details.coverphoto]);

  const [registrationMode, setRegistrationMode] = React.useState(false);

  const handleRegistrationMode = (state) => {
    if (state == true) {
      setRegistrationMode(true);
    } else {
      setRegistrationMode(false);
    }
  };

  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { value: isDataModalOpen, setFalse: closeDataModal, setTrue: openDataModal } = useBoolean();

  const { registration, setRegistration } = useRegistrationStore((state) => ({
    registration: state.registration,
    setRegistration: state.setRegistration,
  }));

  const registrationFormFilled = Object.values(registration).every((x) => x != '' && x != null);

  const handleYearLevelChange = (e) => {
    setRegistration({
      yearlevel: e,
    });
  };

  const handleCourseChange = (e) => {
    setRegistration({
      course: e,
    });
  };

  const { org } = useAdminUser();

  return (
    <>
      <ScrollToTop />
      <TopBar paddingBig={false} eventName={details.name} sidebar={false}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Button
            size="small"
            style={{
              borderColor: colors.blue[300],
              color: colors.blue[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            variant="outlined"
            onClick={() => router.push('details')}
          >
            Back to editing
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
              handlePublishState(false);
              openModal();
            }}
          >
            Save as draft
          </Button>
          <Button
            size="small"
            onClick={() => {
              handlePublishState(true);
              openModal();
            }}
            variant="contained"
          >
            Publish
          </Button>
        </Box>
      </TopBar>
      <Box
        sx={{
          height: '360px',
          width: '100%',
          position: 'absolute',
          maxWidth: '100vw',
          zIndex: '-1',
          backgroundImage: `url(${coverphoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>
      <Box
        sx={{
          paddingTop: '10px',
          margin: '0 144px',
          [theme.breakpoints.between('lg', 'xl')]: {
            margin: '0 112px',
          },
          [theme.breakpoints.between('md', 'lg')]: {
            margin: '0 80px',
          },
          [theme.breakpoints.between('sm', 'md')]: {
            margin: '0 48px',
          },
          [theme.breakpoints.between('xs', 'sm')]: {
            margin: '0 16px',
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '760px',
            marginTop: '240px',
            marginBottom: '80px',
          }}
        >
          <EventTitleCard
            eventName={registrationMode ? details.name + ' Registration Form' : details.name}
            startDate={details.startDate}
            endDate={details.endDate}
            logoSrc={org.logo}
            orgName={org.name}
          >
            {registrationMode ? null : (
              <Button
                size="small"
                onClick={() => {
                  handleRegistrationMode(true);
                }}
                variant="contained"
                sx={{ marginTop: '24px' }}
              >
                Register
              </Button>
            )}
          </EventTitleCard>
          <Typography
            sx={{ marginTop: '40px' }}
            color={colors.gray[700]}
            fontWeight={typography.fontWeight.reg}
            fontSize={typography.fontSize.base}
          >
            {details.description}
          </Typography>

          {registrationMode ? (
            <>
              <Divider variant="fullWidth" sx={{ marginBottom: '8px', marginTop: '32px' }} />

              <Box sx={{ width: '100%' }}>
                <TextFieldWithSubtitle maxLength="6" label="ID Number" subtitleText="ex: 123456" />
                <TextFieldWithSubtitle
                  maxLength="100"
                  label="Name"
                  subtitleText="ex: Jose P. Rizal"
                />
                <TextFieldWithSubtitle
                  maxLength="100"
                  label="Email"
                  subtitleText="ex: joserizal@obf.ateneo.edu"
                />
                <FormControl size="small" sx={{ width: '464px', marginTop: '24px' }}>
                  <InputLabel>Year Level</InputLabel>
                  <Select
                    label="Year Level"
                    value={registration.yearlevel}
                    onChange={(e) => {
                      handleYearLevelChange(e.target.value);
                    }}
                  >
                    <MenuItem value="One">One</MenuItem>
                    <MenuItem value="Two">Two</MenuItem>
                    <MenuItem value="Three">Three</MenuItem>
                    <MenuItem value="Four">Four</MenuItem>
                    <MenuItem value="Five">Five</MenuItem>
                    <MenuItem value="Six">Sixth</MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ width: '464px', marginTop: '24px' }}>
                  <InputLabel>Course</InputLabel>
                  <Select
                    label="Course"
                    value={registration.course}
                    onChange={(e) => {
                      handleCourseChange(e.target.value);
                    }}
                  >
                    <MenuItem value="BS MH">BS MH</MenuItem>
                    <MenuItem value="BS CS">BS CS</MenuItem>
                    <MenuItem value="BS MEA">BS MEA</MenuItem>
                    <MenuItem value="BS COMPSAT">BS COMPSAT</MenuItem>
                    <MenuItem value="BS AJMA">BS AJMA</MenuItem>
                    <MenuItem value="BS BS">BS BS</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Checkbox />
                  <Typography
                    inline
                    sx={{
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.reg,
                      color: colors.gray[700],
                    }}
                  >
                    I agree to the
                  </Typography>
                  <Typography
                    onClick={openDataModal}
                    inline
                    sx={{
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.reg,
                      color: colors.blue[300],
                    }}
                  >
                    &ensp;Data Privacy Policy
                  </Typography>
                </Box>
                <Button disabled={!registrationFormFilled} size="small" sx={{ marginTop: '40px' }}>
                  Submit
                </Button>
              </Box>
            </>
          ) : null}
        </Box>
        {registrationMode ? null : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              [theme.breakpoints.down('lg')]: {
                gridTemplateColumns: '1fr',
              },
              gap: '16px',
              paddingBottom: '5rem',
            }}
          >
            {eventPhotos.map((photo, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    aspectRatio: '1.5',
                  }}
                >
                  <img width="100%" height="100%" src={photo} />
                </Box>
              );
            })}
          </Box>
        )}
        <DataPrivacyModal open={isDataModalOpen} asClose={closeDataModal}>
          <Button
            size="small"
            onClick={closeDataModal}
            variant="outlined"
            sx={{ marginRight: '8px' }}
          >
            Decline
          </Button>
          <Button size="small" onClick={closeDataModal} sx={{ marginLeft: '8px' }}>
            Accept
          </Button>
        </DataPrivacyModal>
        <Modal
          withTextField={false}
          warning={false}
          open={isModalOpen}
          onClose={closeModal}
          title={publish ? 'Publish this to your Pavillion Page?' : 'Close and save as draft'}
          subtitle={
            publish
              ? 'You can still edit event details, but can no longer edit registration forms after publishing and receiving responses.'
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
            label: publish ? 'Publish to Pavillion' : 'Save as draft',
            onClick: () => {
              if (publish) {
                publishEvent();
              } else {
                saveAsDraft();
              }
            },
            sx: {
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
              color: '#FFF',
              background: 'linear-gradient(90deg, #498af4 0%, #1a73e8 100%)',
              ':hover': {
                background: 'linear-gradient(90deg, #498af4 0%, #1a73e8 100%)',
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default Preview;
