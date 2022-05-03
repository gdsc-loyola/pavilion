import React, { useEffect, useState, useRef } from 'react';
import Layout from '$components/Layout';
import EventTitleCard from '../components/EventTitleCard';
import { Box, Typography } from '@mui/material';
import { colors, typography, theme } from '$lib/theme';
import EventsDataService from '$services/events.service';
import OrgsDataService from '$services/orgs.service';
import OtherEvents from '../components/OtherEvents';
import ScrollToTop from '$components/ScrollToTop';
import { shuffleByDay } from '$lib/utils/shuffleByDay';
import { useBoolean } from '$lib/utils/useBoolean';
import RegistrationForm from '../components/RegistrationForm';
import Banner from '../components/Banner';

const EventPage = (props) => {
  const { id, shortName } = props.match.params;

  const [eventForm, setEventForm] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    description: '',
    coverPhoto: '',
    eventPhoto1: '',
    eventPhoto2: '',
    eventPhoto3: '',
    eventPhoto4: '',
    featuredEvents: [],
    eventPhotos: [],
    isAcceptingResponses: false,
  });

  const [otherEvents, setOtherEvents] = useState([]);

  const [orgForm, setOrgForm] = useState({
    orgShortName: '',
    orgName: '',
    orgLogo: '',
  });

  useEffect(() => {
    EventsDataService.get(id).then((eventRes) => {
      setEventForm({
        eventName: eventRes.data.name,
        startDate: eventRes.data.start_date,
        endDate: eventRes.data.end_date,
        description: eventRes.data.desc,
        coverPhoto: eventRes.data.cover_photo,
        eventPhoto1: eventRes.data.event_photo1,
        eventPhoto2: eventRes.data.event_photo2,
        eventPhoto3: eventRes.data.event_photo3,
        eventPhoto4: eventRes.data.event_photo4,
        eventPhotos: [
          eventRes.data.event_photo1,
          eventRes.data.event_photo2,
          eventRes.data.event_photo3,
          eventRes.data.event_photo4,
        ].filter((x) => !!x),
        // The filter removes potential null values
        isAcceptingResponses: eventRes.data.accepting_responses,
      });

      OrgsDataService.get(shortName).then((res) => {
        setOrgForm({
          orgName: res.data.name,
          orgLogo: res.data.logo,
          orgShortName: res.data.short_name,
        });

        setOtherEvents(
          res.data.events.filter(
            (e) => e.id !== eventRes.data.id && e.status !== 'Draft' && e.status !== 'Completed'
          )
        );
      });
    });
  }, [id, shortName]);

  const formRef = useRef();

  const {
    value: isRegistering,
    setFalse: endRegistering,
    setTrue: startRegistering,
  } = useBoolean();

  useEffect(() => {
    if (isRegistering) scrollToForm();
  }, [isRegistering]);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const { value: isBannerOpen, setFalse: closeBanner, setTrue: openBanner } = useBoolean();

  return (
    <>
      <ScrollToTop smooth />
      <Layout>
        <Box
          sx={{
            height: '360px',
            width: '100%',
            position: 'absolute',
            marginTop: '70px',
            maxWidth: '100vw',
            zIndex: '-1',
            backgroundImage: `url(${eventForm.coverPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            [theme.breakpoints.between('xs', 'sm')]: {
              marginTop: '59px',
            },
          }}
        ></Box>
        <Box
          sx={{
            paddingTop: '80px',
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
          <Banner show={isBannerOpen} label="Your response has been submitted!" />
          <Box
            sx={{
              width: '100%',
              maxWidth: '760px',
              marginTop: '240px',
              marginBottom: isRegistering ? '32px' : '80px',
            }}
          >
            <EventTitleCard
              eventName={eventForm.eventName}
              startDate={eventForm.startDate}
              endDate={eventForm.endDate}
              logoSrc={orgForm.orgLogo}
              orgName={orgForm.orgName}
              isAcceptingResponses={eventForm.isAcceptingResponses}
              startRegistering={startRegistering}
            />
            <Typography
              sx={{ marginTop: '40px' }}
              color={colors.gray[700]}
              fontWeight={typography.fontWeight.reg}
              fontSize={typography.fontSize.base}
            >
              {eventForm.description}
            </Typography>
          </Box>
          {!isRegistering ? (
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
              {eventForm.eventPhotos.map((photoUrl, i) => {
                return (
                  <Box
                    key={i}
                    sx={{
                      aspectRatio: '1.5',
                    }}
                  >
                    <img width="100%" height="100%" src={photoUrl} />
                  </Box>
                );
              })}
            </Box>
          ) : (
            <div ref={formRef} style={{ width: '100%' }}>
              <RegistrationForm
                openBanner={openBanner}
                closeBanner={closeBanner}
                endRegistering={endRegistering}
                scrollToTop={scrollToTop}
              />
            </div>
          )}
          {!isRegistering && otherEvents.length > 0 && (
            <OtherEvents
              events={otherEvents}
              orgLogo={orgForm.orgLogo}
              orgName={orgForm.orgName}
              orgShortName={orgForm.orgShortName}
            />
          )}
        </Box>
      </Layout>
    </>
  );
};

export default EventPage;
