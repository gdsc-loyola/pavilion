import React from 'react';
import { Box, Typography, styled, TextField } from '@mui/material';

import EditIcon from './EditIcon';

const CustomContainer = styled('div')({
  'MuiContainer-root': {
    maxWidth: '100%',
    paddingLeft: '68px !important',
    paddingRight: '68px !important',
  },
});

const TopBar = ({ eventName, children, sidebar }) => {
  const [eventTitle, setEventTitle] = React.useState(eventName);

  const handleEventTitleChange = (e) => {
    setEventTitle(e);
  };

  return (
    <CustomContainer
      sx={{
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1.75rem',
        paddingBottom: '1.75rem',
        paddingLeft: sidebar ? '3.5rem' : '144px',
        paddingRight: sidebar ? '3.5rem' : '144px',
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
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
            endAdornment: <EditIcon />,
          }}
          onChange={(e) => {
            handleEventTitleChange(e.target.value);
          }}
          defaultValue={eventTitle}
          sx={{
            width: eventTitle.length * 7 + 100,
            border: 'none',
          }}
        />
      </Box>

      {children}
    </CustomContainer>
  );
};

export default TopBar;
