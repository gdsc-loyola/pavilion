import React, { useState, useEffect } from 'react'
import { Grid, Box, Typography, createTheme, InputBase } from "@mui/material"
import { borderRadius, styled } from '@mui/system'

import '../../../../stylesheets/student/Landing.scss'
import { colors, typography } from '$lib/theme'
import Layout from '../components/Layout'
import hero from '../../../../static/assets/student-landing-hero.png'
import EventCard from '../components/EventCard'
import OrgCard from '../components/OrgCard'
import { Link } from 'react-router-dom'
import orgsService from '../../../services/orgs.service'

// import axios from '../../http-common'
import axios from 'axios'

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
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    }
  })

  const StyledInputRoot = styled('div')`
    border-radius: 8px;
    border: none;
    width: 100%;
    box-sizing: border-box;
  `
  const StyledInputElement = styled('input')`
    background-color: white;
    border-radius: 8px;
    padding: 28px 24px;
    border: none;
    width: 100%;
    box-sizing: border-box;
    ${props => props.theme.breakpoints.down('md')} {
      padding: 20px 16px;
    };
    ${props => props.theme.breakpoints.down(700)} {
      font-size: 12px;
      padding: 16px
    };
  `

  const [orgs, setOrgs] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    orgsService.getEvents().then(response => {
      console.log(response)
      setEvents(response.data)
    })
    orgsService.getAll().then(response => {
      console.log(response)
      setOrgs(response.data)
    })
  }, [])

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
              padding: '0 86px',
              [theme.breakpoints.down('sm')]: {
                padding: '0 16px'
              }
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
              sx={{
                [theme.breakpoints.down('md')]: {
                  fontSize: typography.fontSize.xl,
                  marginBottom: '20px'
                },
                [theme.breakpoints.down('sm')]: {
                  fontSize: typography.fontSize.md,
                  marginBottom: '16px'
                }
              }}
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
              <InputBase
                theme={theme}
                components={{Root: StyledInputRoot, Input: StyledInputElement}}
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
          Featured Events click me
        </Typography>
        {/* 6 random events */}
        {/* .map return event card component */}
        <Grid container spacing={2} columns={3} marginBottom="120px">
        { events.length > 0 &&
          events.map(event => (
            <Grid item xs={3} sm={3} md={1} lg={1}>
              <EventCard
                imgSrc={event.cover_photo}
                alt=""
                eventName={event.name}
                startDate={event.start_date}
                endDate={event.end_date}
                logoSrc=""
                logoName=""
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
        { orgs.length > 0 &&
          orgs.map(org => (
            <Grid item xs={4} sm={4} md={2} lg={1}>
              <OrgCard orgPhoto={org.logo} orgBody={org.org_body.toLowerCase()} orgName={org.name} />
            </Grid>
          ))
        }
        </Grid>
      </Box>
    </Layout>
  )
}

export default Landing
