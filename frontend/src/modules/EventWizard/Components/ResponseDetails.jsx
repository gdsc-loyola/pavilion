import React, { useState } from 'react'
import { Drawer, Box, Button, styled, Menu, MenuItem as MItem, Typography } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material'
import { colors } from '$lib/theme'
import { useBoolean } from '$lib/utils/useBoolean';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRaidus: 6,
    border: `1px solid ${theme.colors.gray[300]}`,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
  '& .MuiMenu-list': {
    margin: 0,
    padding: 0
  }
}));

const MenuItem = styled(MItem)(({
  fontSize: '14px',
  fontWeight: 400,
  padding: '0.8rem 4.5rem',
  color: colors.gray[700],
  justifyContent: 'center',
  '&.MuiMenuItem-root:hover': {
    backgroundColor: colors.blue[100],
  },
}))

const DeleteMenuItem = styled(MItem)(({
  fontSize: '14px',
  fontWeight: 400,
  padding: '0.8rem 4.5rem',
  color: colors.red[300],
  justifyContent: 'center',
  '&.MuiMenuItem-root:hover': {
    backgroundColor: colors.red[100],
  },
}))

const EntryField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
})

const EntryFieldTitle = styled(Typography)({
  fontSize: '14px',
  color: colors.gray[500],
})

const EntryFieldText = styled(Typography)({
  fontSize: '14px',
  color: colors.gray[700],
})

const ResponseDetails = ({ anchor, title, open, onClose, onNextEntry, onPrevEntry }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);

  const submissionDateTime = new Date(open?.dateCreated);
  const updatedDateTime = open?.updatedAt ? new Date(open?.updatedAt) : null;

  const { value: isEditMode, setFalse: endEditMode, setTrue: startEditMode } = useBoolean();

  return (
    <Drawer
      anchor={anchor}
      open={open ? true : false}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
        }
      }}
      PaperProps={{
        sx: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08), 0px 4px 10px rgba(0, 0, 0, 0.08)',
          width: '34%'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
          alignItems: 'center',
          borderBottom: '1px solid #D1D5DB',
          padding: '20px 24px'
        }}
      >
        <Box sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Button
            variant='outlined'
            sx={{
              padding: '4px',
              minWidth: 0,
            }}
            onClick={onPrevEntry}
          >
            <KeyboardArrowUp />
          </Button>
          <Button
            variant='outlined'
            sx={{
              padding: '4px',
              minWidth: 0,
            }}
            onClick={onNextEntry}
          >
            <KeyboardArrowDown />
          </Button>
          <p style={{ color: colors.gray[700], margin: 'auto 0', fontSize: '16px', fontWeight: 500 }}>{ title }</p>
        </Box>
        <MoreVert
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            color: colors.gray[500]
          }}
        />
        <StyledMenu
          MenuListProps={{
            'aria-labelledby': 'customized-button',
          }}
          anchorEl={anchorEl}
          
          open={menuOpen}
          onClose={handleClose}
        >
          <MenuItem onClick={startEditMode} disableRipple>
            Edit
          </MenuItem>
          <DeleteMenuItem onClick={() => alert('open delete modal')} disableRipple>
            Delete
          </DeleteMenuItem>
        </StyledMenu>
      </Box>
      <Box
        sx={{
          padding: '16px 24px',
          backgroundColor: colors.blue[100],
        }}
      >
          <p
            style={{ 
              margin: '0 0 10px 0', 
              padding: 0,
              color: colors.gray[700],
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            {open?.id}. {open?.fullName}
          </p>
          <p 
            style={{
              color: colors.gray[500],
              fontSize: '14px',
              margin: 0,
              padding: 0
            }}
          >
            Submitted on {months[submissionDateTime.getUTCMonth()]} {submissionDateTime.getUTCDate()}, {submissionDateTime.getUTCFullYear()} at {submissionDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
          </p>
          {
            open?.updatedAt &&
            <p 
              style={{
                color: colors.gray[500],
                fontSize: '14px',
                margin: '6px 0 0 0',
                padding: 0
              }}
            >
              Updated on {months[updatedDateTime.getUTCMonth()]} {updatedDateTime.getUTCDate()}, {updatedDateTime.getUTCFullYear()} at {updatedDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </p>
          }
      </Box>
      {
        isEditMode ?
        <Box>
          Edit mode with fields
        </Box>
        :
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '32px 24px'
          }}
        >
          <EntryField>
            <EntryFieldTitle>
              Full name
            </EntryFieldTitle>
            <EntryFieldText>
              { open?.fullName }
            </EntryFieldText>
          </EntryField>
          <EntryField>
            <EntryFieldTitle>
              Email
            </EntryFieldTitle>
            <EntryFieldText>
              { open?.email }
            </EntryFieldText>
          </EntryField>
          <EntryField>
            <EntryFieldTitle>
              ID Number
            </EntryFieldTitle>
            <EntryFieldText>
              { open?.idNum }
            </EntryFieldText>
          </EntryField>
          <EntryField>
            <EntryFieldTitle>
              Year level
            </EntryFieldTitle>
            <EntryFieldText>
              { open?.year }
            </EntryFieldText>
          </EntryField>
          <EntryField>
            <EntryFieldTitle>
              Course
            </EntryFieldTitle>
            <EntryFieldText>
              { open?.course }
            </EntryFieldText>
          </EntryField>
        </Box>
      }
    </Drawer>
  )
}

export default ResponseDetails