import React from 'react'
import { Grid, Box, Typography, InputUnstyled } from "@mui/material"
import { borderRadius, styled } from '@mui/system'

import '../../../stylesheets/student/Landing.scss'
import { colors, typography } from '$lib/theme'
import Layout from '../components/Layout'
import hero from '../../../static/assets/student-landing-hero.png'
import EventCard from '../../components/EventCard'
import OrgCard from '../../components/OrgCard'
import { Link } from 'react-router-dom'

const eventsArr = [
  {
    eventName: 'HackFest',
    startDate: 'Aug 24, 2020',
    endDate: 'Aug 26, 2020',
    logoName: 'GDSC-L'
  },
  {
    eventName: 'FrostBYTE',
    startDate: 'Oct 1, 2020',
    endDate: 'Oct 7, 2020',
    logoName: 'BYTE'
  },
  {
    eventName: 'Intro to Git and Notion',
    startDate: 'Nov 20, 2020',
    endDate: 'Nov 21, 2020',
    logoName: 'CompSAt'
  },
  {
    eventName: 'UX & Chill',
    startDate: 'Feb 10, 2020',
    endDate: 'Feb 13, 2020',
    logoName: 'UXSoc'
  },
  {
    eventName: 'Tech Everywhere',
    startDate: 'Feb 25, 2020',
    endDate: 'Mar 1, 2020',
    logoName: 'GDSC-L'
  },
  {
    eventName: 'Blue-hacks',
    startDate: 'Dec 7, 2020',
    endDate: 'Dec 21, 2020',
    logoName: 'CompSAt'
  },
]

const orgsArr = [
  {
    name: "GDSC-L",
    body: "lions",
    photo: "#"
  },
  {
    name: "BYTE",
    body: "lions",
    photo: "#"
  },
  {
    name: "CompSAt",
    body: "coa",
    photo: "#"
  },
  {
    name: "Sanggu",
    body: "sanggu",
    photo: "#"
  },
  {
    name: "GDSC-L",
    body: "lions",
    photo: "#"
  },
  {
    name: "BYTE",
    body: "lions",
    photo: "#"
  },
  {
    name: "CompSAt",
    body: "coa",
    photo: "#"
  },
  {
    name: "Sanggu",
    body: "sanggu",
    photo: "#"
  }
]

const Landing = () => {

  return (
    <Layout transparent_nav>
      <Box
        component="div"
        sx={{
          position: 'relative'
        }}
      >
        <img src={hero} alt="" style={{ width: '100%' }} />
        <Box
          component="div"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex'
          }}
        >
          <Box
            component="div"
            sx={{
              margin: 'auto',
              flex: '0 1 100%',
              textAlign: 'center',
              padding: '0 16px'
            }}
          >
            <Typography
              component="h1"
              color="white"
              margin="auto 0"
              width="100%"
              fontSize={typography.fontSize['2xl']}
              fontWeight={700}
              marginBottom="24px"
            >
              Welcome to the Pavilion.
            </Typography>
            <Box
              component="div"
              sx={{
                display: 'flex',
                maxWidth: '760px',
                margin: '0 auto',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <input
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '28px 24px',
                  border: 'none',
                  width: '100%'
                }}
                placeholder="Looking for any organization or event?"
              />
              <svg style={{ position: 'absolute', top: '50%', right: '24px', transform: 'translateY(-50%)', cursor: 'pointer' }} width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="24" fill="url(#a)"/><path d="M33.71 32.29 30 28.61A9 9 0 1 0 28.61 30l3.68 3.68a1.002 1.002 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM23 30a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" fill="#fff"/><defs><linearGradient id="a" x1="0" y1="24" x2="48" y2="24" gradientUnits="userSpaceOnUse"><stop stop-color="#498AF4"/><stop offset="1" stop-color="#1A73E8"/></linearGradient></defs></svg>
            </Box>
          </Box>
          <Typography
            component="p"
            position="absolute"
            bottom={15}
            right={144}
            color="white"
            fontSize={typography.fontSize.xs}
          >
            Photo by Nina San Andres
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          margin: '81px 144px'
        }}
      >
        <Typography
          component="h2"
          fontSize={typography.fontSize.xl}
          fontWeight={typography.fontWeight.bold}
          marginBottom="24px"
        >
          Featured Events
        </Typography>
        {/* 6 random events */}
        {/* .map return event card component */}
        <Grid container spacing={2} columns={3} marginBottom="120px">
        {
          eventsArr.map(event => (
            <Grid item xs={3} sm={3} md={1} lg={1}>
              <EventCard
                imgSrc="https://via.placeholder.com/368x92"
                alt=""
                eventName={event.eventName}
                startDate={event.startDate}
                endDate={event.endDate}
                logoSrc="https://via.placeholder.com/24"
                logoName={event.logoName}
              />
            </Grid>
          ))
        }
        </Grid>

        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '24px'
          }}
        >
          <Typography
            component="h2"
            fontSize={typography.fontSize.xl}
            fontWeight={typography.fontWeight.bold}
          >
            Featured Organizations
          </Typography>

          <Link
            style={{
              textDecoration: 'none',
              color: colors.blue[400],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med
            }}
            to="/organizations"
          >
            View all organizations
          </Link>
        </Box>

        <Grid container spacing={2} columns={4}>
        {
          orgsArr.map(org => (
            <Grid item xs={4} sm={4} md={2} lg={1}>
              <OrgCard orgPhoto={'https://via.placeholder.com/64'} orgBody={org.body} orgName={org.name} />
            </Grid>
          ))
        }
        </Grid>
      </Box>
    </Layout>
  )
}

export default Landing
