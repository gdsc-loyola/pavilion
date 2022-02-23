import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import TopBar from '../components/TopBar';
import Layout from '../components/Layout';
import LinkIcon from '../components/LinkIcon';
import DownloadIcon from '../components/DownloadIcon';
import { Button, Box, styled } from '@mui/material';
import { colors, typography } from '$lib/theme';

const Details = () => {
  const { eventName } = useParams();
  return (
    <Layout>
      <TopBar eventName={eventName}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <Button
            size="small"
            style={{
              borderColor: colors.red[300],
              color: colors.red[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            variant="outlined"
          >
            Discard
          </Button>
          <Button
            size="small"
            style={{
              borderColor: colors.blue[300],
              color: colors.blue[300],
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.med,
            }}
            inputprops
            variant="outlined"
          >
            Save as draft
          </Button>
          <Button disabled={true} size="small" variant="outlined">
            Preview Webpage
          </Button>
        </Box>
      </TopBar>
    </Layout>
  );
};

export default Details;
