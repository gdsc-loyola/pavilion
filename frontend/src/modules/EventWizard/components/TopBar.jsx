import React from 'react';
import { Box, styled, TextField } from '@mui/material';
import { useEventDetailsStore } from '../store/useEventDetailsStore';
import EditIcon from './EditIcon';

const CustomContainer = styled('div')({
  'MuiContainer-root': {
    maxWidth: '100%',
    paddingLeft: '68px !important',
    paddingRight: '68px !important',
  },
});

const TopBar = ({ children, sidebar, paddingBig = true }) => {
  const { details, setDetails } = useEventDetailsStore();

  const handleNameChange = (e) => {
    setDetails({
      name: e,
    });
  };
  return (
    <CustomContainer
      sx={{
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: paddingBig ? '1.75rem' : '14px',
        paddingBottom: paddingBig ? '1.75rem' : '14px',
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
            handleNameChange(e.target.value);
          }}
          value={details.name || ''}
          sx={{
            width: details.name ? details.name.length * 9 + 100 : '0px',
            border: 'none',
          }}
        />
      </Box>

      {children}
    </CustomContainer>
  );
};

export default TopBar;
