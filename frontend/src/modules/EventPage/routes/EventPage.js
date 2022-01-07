import React, { useEffect, useState } from 'react';
import Layout from '$components/Layout';
import EventTitleCard from '../components/EventTitleCard';
import { Box, Typography } from '@mui/material';
import { colors, typography, theme } from '$lib/theme';
import EventsDataService from '$services/events.service';
import OrgsDataService from '$services/orgs.service';
const EventPage = () => {
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
  });

  const [orgForm, setOrgForm] = useState({
    orgName: '',
    orgLogo: '',
  });

  useEffect(() => {
    EventsDataService.get(1).then((res) => {
      setEventForm({
        eventName: res.data.name,
        startDate: res.data.start_date,
        endDate: res.data.end_date,
        description: res.data.desc,
        coverPhoto: res.data.cover_photo,
        eventPhoto1: res.data.event_photo1,
        eventPhoto2: res.data.event_photo2,
        eventPhoto3: res.data.event_photo3,
        eventPhoto4: res.data.event_photo4,
      });

      OrgsDataService.get(1).then((res) => {
        setOrgForm({
          orgName: res.data.name,
          orgLogo: res.data.logo,
        });
      });
    });
  }, []);

  return (
    <>
      <Layout>
        <img
          height="360px"
          width="100%"
          style={{ position: 'absolute', marginTop: '80px', zIndex: '-1' }}
          src="http://placehold.jp/150x150.png"
        />
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
          <Box
            sx={{
              width: '100%',
              maxWidth: '760px',
              marginTop: '240px',
              marginBottom: '80px',
            }}
          >
            <EventTitleCard
              eventName={eventForm.eventName}
              startDate={eventForm.startDate}
              endDate={eventForm.endDate}
              logoSrc={orgForm.orgLogo}
              orgName={orgForm.orgName}
            />
            <Typography
              sx={{ marginTop: '40px' }}
              color={colors.gray[700]}
              fontWeight={typography.fontWeight.reg}
              fontSize={typography.fontSize.base}
            >
              {eventForm.eventName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
              }}
            >
              <Box
                sx={{
                  width: '564px',
                  height: '376px',
                  marginRight: '12px',
                  [theme.breakpoints.down('1380')]: {
                    marginRight: '0',
                    marginBottom: '12px',
                  },
                }}
              >
                <img width="100%" height="100%" src={eventForm.eventPhoto1} />
              </Box>
              <Box
                sx={{
                  width: '564px',
                  height: '376px',
                  marginLeft: '12px',
                  [theme.breakpoints.down('1380')]: {
                    marginLeft: '0',
                    marginTop: '12px',
                  },
                }}
              >
                <img width="564px" height="376px" src={eventForm.eventPhoto2} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                [theme.breakpoints.down('md')]: {
                  margin: '0 80px',
                },
              }}
            >
              <Box
                sx={{
                  width: '564px',
                  height: '376px',
                  marginRight: '12px',
                  [theme.breakpoints.down('1380')]: {
                    marginRight: '0',
                    marginBottom: '12px',
                  },
                }}
              >
                <img width="100%" height="100%" src={eventForm.eventPhoto3} />
              </Box>
              <Box
                sx={{
                  width: '564px',
                  height: '376px',
                  marginLeft: '12px',
                  [theme.breakpoints.down('1380')]: {
                    marginLeft: '0',
                    marginBottom: '12px',
                    marginTop: '12px',
                  },
                }}
              >
                <img width="564px" height="376px" src={eventForm.eventPhoto4} />
              </Box>
            </Box>
          </Box>
          <Typography
            sx={{ marginTop: '120px' }}
            color={colors.gray[700]}
            fontSize={typography.fontSize.lg}
            fontWeight={typography.fontWeight.med}
          >
            Other events by {orgForm.orgName}
          </Typography>
          {/* <Grid container sx={{ marginBottom: "120px", marginTop: "40px" }} spacing={2} columns={3}>
            {eventForm.featuredEvents.length > 0 &&
              eventForm.featuredEvents.map((event) => (
                <Grid item xs={3} sm={3} md={1} lg={1}>
                  <EventCard
                    imgSrc={event.cover_photo}
                    alt=""
                    eventName={event.name}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    logoSrc=""
                    logoName=""
                  />
                </Grid>
              ))}
          </Grid> */}
        </Box>
      </Layout>
    </>
  );
};

export default EventPage;
