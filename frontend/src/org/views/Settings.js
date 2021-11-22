import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import OrgTitleCard from '../../components/OrgTitleCard'
import EventCard from '../../components/EventCard'
import { Typography, Box, Grid, Button } from '@mui/material'
import { colors, typography } from '../../lib/theme'

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
  
const Settings = (props) => {

    const openForSignUps = true;
    return (
    <>
        <NavBar/>
        <Box sx={{margin: '0 144px', paddingTop: '80px'}}>
            <Typography color={colors.gray[500]} sx={{margin:'80px 0px'}} fontSize={typography.fontSize.base} fontWeight={typography.fontWeight.reg}>
                <svg style={{marginRight: '16px'}} width="8" height="12"><path d="M7.41 1.41 6 0 0 6l6 6 1.41-1.41L2.83 6l4.58-4.59Z" fill="#6B7280"/></svg> Back to organizations     
            </Typography>
            {openForSignUps ? 
            <Box sx={{marginBottom: '40px', padding: '24px 32px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.blue[100]}}>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <svg style={{marginRight: '14.67px'}} width="28" height="28"><path d="M14 .667C6.64.667.665 6.64.665 14s5.973 13.333 13.333 13.333S27.333 21.36 27.333 14 21.359.667 13.999.667Zm1.333 20h-2.667v-8h2.667v8Zm0-10.667h-2.667V7.333h2.667V10Z" fill="#498AF4"/></svg>
                    <Typography color={colors.blue[300]} fontWeight={typography.fontWeight.reg} fontSize={typography.fontSize.base}>
                        This organization is open for member sign-ups!
                    </Typography>
                </Box>
                <Button size="large" variant="outlined">
                    <Typography color={colors.blue[300]} fontSize={typography.fontSize.sm} fontWeight={typography.fontWeight.med} sx={{textTransform: 'none'}}>Sign Up</Typography>
                </Button>
            </Box> 
            : <></>}
            <OrgTitleCard
            orgBody="LIONS"
            logoSrc="http://placehold.jp/150x150.png"
            orgName="Google Students Developer Club"
            shortOrgName="GDSC-L"
            />
            <Typography sx={{marginTop: '40px', marginBottom: '80px'}} fontSize={typography.fontSize.md} color={colors.gray[700]} fontWeight={typography.fontWeight.reg}>
                Developer Student Clubs Loyola is a student organization in the Ateneo de Manila University powered by Google Developers that aims to build students’ skills and network by giving them access to different technologies, specifically Google Developer technologies like Android, Firebase, Angular, Flutter, Google Cloud Platform and many more. Together, we learn in a peer-to-peer learning environment and build solutions for the community.
            </Typography>
            <Typography color={colors.gray[700]} component="h2" fontSize={typography.fontSize.xl} fontWeight={typography.fontWeight.bold} marginBottom="24px">
                Past Events
            </Typography>
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
        </Box>
        
        <Footer/>
    </>
  )
}

export default Settings
