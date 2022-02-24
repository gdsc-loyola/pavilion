import React from 'react';
import { Box, Typography, styled } from '@mui/material';

import EditIcon from './EditIcon';

const CustomContainer = styled('div')({
  'MuiContainer-root': {
    maxWidth: '100%',
    paddingLeft: '68px !important',
    paddingRight: '68px !important',
  },
});

const TopBar = ({ eventName, children, sidebar }) => {
  return (
    <CustomContainer
      sx={{
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1.75rem',
        paddingBottom: '1.75rem',
        paddingLeft: sidebar ? '144px' : '3.5rem',
        paddingRight: sidebar ? '144px' : '3.5rem',
        borderBottom: '1px solid #D1D5DB',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        <Typography variant="p" fontWeight={500}>
          {eventName}
        </Typography>
        <EditIcon />
      </Box>

      {children}
    </CustomContainer>
  );
};

export default TopBar;
