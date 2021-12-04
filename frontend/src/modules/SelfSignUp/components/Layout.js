import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

import Sidebar from './Sidebar';
import Progress from './Progress';
import { typography } from '$lib/theme';

/**
 * @typedef {Object} Props
 * @property {number} step
 * @property {string} title
 * @property {React.ReactNode} children
 */
/**
 * @param {Props} props
 * @returns {React.Component}
 */
const Layout = (props) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          flex: 1,
          padding: '4rem',
          [theme.breakpoints.down('sm')]: {
            padding: '4rem 2rem',
            h1: {
              fontSize: typography.fontSize['lg'],
            },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Progress step={props.step} />
          <Typography variant="h1" align="center">
            {props.title}
          </Typography>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
