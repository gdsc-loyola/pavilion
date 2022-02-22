import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
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
import ToggleButton from '../components/ToggleButton';
import emptyState from '$static/assets/emptyState.svg';
import Modal from '../components/Modal';
import Banner from '../components/Banner';

const Responses = () => {
  const { eventName } = useParams()
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
          Responses (0)
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
              <ToggleButton value={accepting} onChange={(e) => handleAcceptToggle(e)} />
            </Box>
          </Box>
        </Box>

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