import React from 'react';
import { Drawer, Typography, Box, Divider } from '@mui/material';
import { colors, typography } from '$lib/theme';

const Sidebar = () => {
  return (
    <Box
      sx={{
        height: '900px',
        width: '200px',
        backgroundColor: colors.blue[50],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          color: colors.gray[700],
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.bold,
        }}
      >
        Manage Event
      </Typography>
      <Divider />
    </Box>
  );
};

export default Sidebar;
