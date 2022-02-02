import React, { useEffect } from 'react';
import Layout from '$components/Layout';
import OrgTitleCard from '../components/OrgTitleCard';
import EventCard from '$components/EventCard';
import { Typography, Box, Grid, Button, createTheme } from '@mui/material';
import { colors, typography } from '$lib/theme';
import OrgsDataService from '$services/orgs.service';

const OrgPage = (props) => {
  const { id } = props.match.params;
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const [orgForm, setOrgForm] = React.useState({
    name: '',
    short_name: '',
    desc: '',
    orgBody: '',
    logo: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    website: '',
    events: [],
  });

  useEffect(() => {
    OrgsDataService.get(id).then((res) => {
      setOrgForm({
        name: res.data.name,
        short_name: res.data.short_name,
        desc: res.data.desc,
        orgBody: res.data.org_body,
        logo: res.data.logo,
        facebook: res.data.facebook,
        instagram: res.data.instagram,
        twitter: res.data.twitter,
        linkedin: res.data.linkedin,
        website: res.data.website,
        events: res.data.events,
      });
    });
  }, [id]);

  const openForSignUps = true;

  return (
    <>
      <Layout>
        <Box
          sx={{
            margin: '0 144px',
            paddingTop: '80px',
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
          }}
        >
          <a href="/organizations">
            <Typography
              color={colors.gray[500]}
              sx={{
                margin: '80px 0px',
                [theme.breakpoints.down('sm')]: {
                  margin: '30px 0',
                },
              }}
              fontSize={typography.fontSize.base}
              fontWeight={typography.fontWeight.reg}
            >
              <svg style={{ marginRight: '16px' }} width="8" height="12">
                <path d="M7.41 1.41 6 0 0 6l6 6 1.41-1.41L2.83 6l4.58-4.59Z" fill="#6B7280" />
              </svg>{' '}
              Back to organizations
            </Typography>
          </a>
          {openForSignUps ? (
            <Box
              sx={{
                marginBottom: '40px',
                padding: '24px 32px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.blue[100],
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <svg style={{ marginRight: '14.67px' }} width="28" height="28">
                  <path
                    d="M14 .667C6.64.667.665 6.64.665 14s5.973 13.333 13.333 13.333S27.333 21.36 27.333 14 21.359.667 13.999.667Zm1.333 20h-2.667v-8h2.667v8Zm0-10.667h-2.667V7.333h2.667V10Z"
                    fill="#498AF4"
                  />
                </svg>
                <Typography
                  color={colors.blue[300]}
                  fontWeight={typography.fontWeight.reg}
                  fontSize={typography.fontSize.base}
                >
                  This organization is open for member sign-ups!
                </Typography>
              </Box>
              <Button size="large" variant="outlined">
                <Typography
                  color={colors.blue[300]}
                  fontSize={typography.fontSize.sm}
                  fontWeight={typography.fontWeight.med}
                  sx={{ textTransform: 'none' }}
                >
                  Sign Up
                </Typography>
              </Button>
            </Box>
          ) : (
            <></>
          )}
          <OrgTitleCard
            orgBody={orgForm.orgBody}
            logoSrc={orgForm.logo}
            orgName={orgForm.name}
            shortOrgName={orgForm.short_name}
            facebook={orgForm.facebook}
            instagram={orgForm.instagram}
            twitter={orgForm.twitter}
            linkedin={orgForm.linkedin}
            website={orgForm.website}
          />
          <Typography
            sx={{ marginTop: '40px', marginBottom: '80px' }}
            fontSize={typography.fontSize.md}
            color={colors.gray[700]}
            fontWeight={typography.fontWeight.reg}
          >
            {orgForm.desc}
          </Typography>
          <Typography
            color={colors.gray[700]}
            component="h2"
            fontSize={typography.fontSize.xl}
            fontWeight={typography.fontWeight.bold}
            marginBottom="24px"
          >
            Past Events
          </Typography>
          <Grid container spacing={2} columns={3} marginBottom="120px">
            {orgForm.events
              .filter((event) => event.status === 'Published')
              .map((event) => (
                <Grid item xs={3} sm={3} md={1} lg={1} key={event.name}>
                  <EventCard
                    imgSrc={event.cover_photo}
                    alt={event.desc}
                    eventName={event.name}
                    eventId={event.id}
                    startDate={event.start_date}
                    endDate={event.end_date}
                    logoSrc={orgForm.logo}
                    logoName={orgForm.short_name}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default OrgPage;
