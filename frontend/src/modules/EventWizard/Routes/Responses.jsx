import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Switch, styled } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid'
import { colors, typography } from '$lib/theme';
import { useBoolean } from '$lib/utils/useBoolean';

import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import LinkIcon from '../components/LinkIcon';
import DownloadIcon from '../components/DownloadIcon';
import Container from '../components/Container'
import Searchbar from '$components/Searchbar';
import LeftArrow from '../components/LeftArrow';
import RightArrow from '../components/RightArrow';
import emptyState from '$static/assets/emptyState.svg';
import Modal from '../components/Modal';
import Banner from '../components/Banner';
import ResponsesTable from '../components/ResponsesTable';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const columns = [
  { field: 'id', type: 'number', headerName: 'ID #', valueFormatter: (params) => `#${('000' + params.value).substr(-3)}`, flex: 0.1, sortable: false },
  { field: 'fullName', headerName: 'Full Name', flex: 0.7, sortable: false },
  { field: 'email', headerName: 'Email', flex: 1, sortable: false },
  { field: 'dateCreated', headerName: 'Submission Date', valueFormatter: (params) => { 
    const date = new Date(params.value)
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
  }, flex: 0.5, sortable: false },
  { field: 'updatedAt', headerName: 'Last Updated On', valueFormatter: (params) => { 
    const date = new Date(params.value)
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
  }, flex: 0.5, sortable: false },
  { field: 'actions', type: 'actions', flex: 0.1, getActions: (params) => [
    <GridActionsCellItem 
      key={params.id}
      label='Edit'
      onClick={() => alert(`edit field num: ${params.id}`)}
      showInMenu
    />,
    <GridActionsCellItem
      key={params.id}
      label='Delete'
      onClick={() => alert(`delete field num: ${params.id}`)}
      showInMenu
    />
  ]}
]

const rows = [{
  "id": 1,
  "fullName": "Leda Clubley",
  "email": "lclubley0@un.org",
  "dateCreated": "2022-01-06T06:04:54Z",
  "updatedAt": "2021-12-31T03:24:23Z",
  "idNum": "3",
  "year": 1,
  "course": "Bluezoom"
}, {
  "id": 2,
  "fullName": "Jesse Stutte",
  "email": "jstutte1@redcross.org",
  "dateCreated": "2022-02-16T18:29:57Z",
  "updatedAt": "2022-02-02T09:34:47Z",
  "idNum": "27",
  "year": 2,
  "course": "Jamia"
}, {
  "id": 3,
  "fullName": "Billie Finnes",
  "email": "bfinnes2@accuweather.com",
  "dateCreated": "2022-02-22T11:48:35Z",
  "updatedAt": "2022-02-03T22:09:02Z",
  "idNum": "01",
  "year": 3,
  "course": "Dynabox"
}, {
  "id": 4,
  "fullName": "Cordula Hadland",
  "email": "chadland3@wikimedia.org",
  "dateCreated": "2022-02-18T16:13:13Z",
  "updatedAt": "2022-01-15T12:27:09Z",
  "idNum": "89555",
  "year": 4,
  "course": "Topicware"
}, {
  "id": 5,
  "fullName": "Khalil Joannet",
  "email": "kjoannet4@nih.gov",
  "dateCreated": "2021-12-21T04:07:47Z",
  "updatedAt": "2022-01-10T12:05:45Z",
  "idNum": "05",
  "year": 5,
  "course": "Quamba"
}, {
  "id": 6,
  "fullName": "Emmalyn Burburough",
  "email": "eburburough5@umich.edu",
  "dateCreated": "2022-01-05T12:32:05Z",
  "updatedAt": "2022-02-17T00:10:35Z",
  "idNum": "744",
  "year": 6,
  "course": "Ailane"
}, {
  "id": 7,
  "fullName": "Cristie Gerring",
  "email": "cgerring6@elpais.com",
  "dateCreated": "2022-01-13T00:56:04Z",
  "updatedAt": "2022-01-23T05:11:42Z",
  "idNum": "6",
  "year": 7,
  "course": "Edgeify"
}, {
  "id": 8,
  "fullName": "Traver Schwaiger",
  "email": "tschwaiger7@apple.com",
  "dateCreated": "2022-02-20T13:03:26Z",
  "updatedAt": "2022-02-18T17:38:42Z",
  "idNum": "06097",
  "year": 8,
  "course": "Oyonder"
}, {
  "id": 9,
  "fullName": "Addie Skym",
  "email": "askym8@nba.com",
  "dateCreated": "2022-02-10T04:16:15Z",
  "updatedAt": "2022-02-01T21:16:13Z",
  "idNum": "886",
  "year": 9,
  "course": "Skinder"
}, {
  "id": 10,
  "fullName": "Cathi Flann",
  "email": "cflann9@de.vu",
  "dateCreated": "2022-01-09T21:46:41Z",
  "updatedAt": "2021-12-20T03:59:37Z",
  "idNum": "663",
  "year": 10,
  "course": "Tagopia"
}]

const ToggleSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    color: '#fff',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: colors.blue[300],
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: colors.blue[300],
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: colors.gray[400],
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Responses = () => {
  const { eventName } = useParams()
  const [responses, setResponses] = useState(rows)
  const [search, setSearch] = useState('')
  const [accepting, setAccepting] = useState(true)
  useEffect(() => {
    if (!accepting) {
      // TODO: update accepting status
    }
  }, [accepting])

  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const { value: isBannerVisible, setFalse: hideBanner, setTrue: showBanner } = useBoolean();

  useEffect(() => {
    if (isBannerVisible) {
      setTimeout(() => {
        hideBanner()
      }, 3000)
    }
  }, [isBannerVisible])

  const handleAcceptToggle = (event) => {
    if (!event.target.checked) {
      openModal()
    }
  }

  return (
    <Layout>
      <TopBar eventName={eventName}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px'
          }}
        >
          <Button sx={{
            padding: '.5rem 1.5rem',
            color: colors.blue[300]
          }} variant="outlined" onClick={showBanner}>
            <LinkIcon />
            <p style={{ margin: 'auto 0 auto 4px'}}>Copy event link</p>
          </Button>
          <Button sx={{
            padding: '.5rem 1.5rem',
            color: colors.blue[300]
          }} variant="outlined">
            <DownloadIcon />
            <p style={{ margin: 'auto 0 auto 4px'}}>Download all</p>
          </Button>
        </Box>
      </TopBar>

      <Container>
        <Typography variant='h6' fontWeight={700}>
        {
          // TODO: number of responses
        }
          Responses ({responses.length})
        </Typography>

        <Box component={'div'} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}>
          <Searchbar onChange={(e) => setSearch(e.target.value)} value={search} label="Search responses" placeholder="Search responses" size='medium' />
          <Box sx={{
            display: 'flex'
          }}>
            {/* pages */}
            <Box sx={{
              display: 'flex',
              borderRight: '1px solid #D1D5DB',
              paddingRight: '24px',
              marginRight: '24px',
              alignItems: 'center',
              gap: '16px'
            }}>
              <Typography component="p">
                {
                  // TODO: Pagination
                }
                Page 1 of 1
              </Typography>
              <LeftArrow />
              <RightArrow />
            </Box>
            
            {/* accept toggle */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Typography component="p">
                Accepting responses
              </Typography>
              <ToggleSwitch value={accepting} onChange={(e) => handleAcceptToggle(e)} />
            </Box>
          </Box>
        </Box>

        {
          responses.length > 0 ? <ResponsesTable columns={columns} rows={rows} /> :
          <Box
            sx={{
              marginTop: '3rem',
              marginBottom: isBannerVisible ? '0' : '4rem',
              padding: '2rem',
              backgroundColor: colors.blue[50],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '2rem',
              height: '100%',
              flex: 1,
              h4: {
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.med,
              },
            }}
          >
            <img src={emptyState} style={{ width: '400px' }} />
            <h4>You don&apos;t have any responses yet!</h4>
            <Button>
              <LinkIcon white />
              <p style={{ margin: 'auto 0 auto 4px'}}>Copy event link</p>
            </Button>
          </Box>
        }

        <Banner show={isBannerVisible} label={"Event link copied to clipboard!"} />
      </Container>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        withTextField={false}
        warning={true}
        title="Stop accepting responses"
        subtitle="This event won&apos;t receive new respondents anymore."
        onSubmit={() => setAccepting(false)}
        leftButtonProps={{
          label: 'Never mind',
          onClick: closeModal,
        }}
        rightButtonProps={{
          label: 'Stop accepting',
          type: 'submit'
        }}
      />
    </Layout>
  )
}

export default Responses;