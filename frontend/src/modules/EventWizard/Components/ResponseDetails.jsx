import React, { useState, useEffect } from 'react'
import { Drawer, Box, Button, styled, Menu, MenuItem as MItem, Typography, Select, TextField, InputLabel, Autocomplete } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material'
import { colors } from '$lib/theme'
import { useBoolean } from '$lib/utils/useBoolean';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const courses = [
  "AB Art Management",
  "BFA Major in Creative Writing",
  "BFA Major in Information Design",
  "BFA Major in Theater Arts",
  "AB Humanities",
  "AB Interdisciplinary Studies",
  "AB Literature-English",
  "AB Literature-Filipino (Filipino-Panitikan)",
  "AB Philosophy",
  "BS Communications Technology Management",
  "BS Information Technology Entrepreneurship",
  "BS Legal Management",
  "BS Management",
  "BS Management (Honors)",
  "BS Management Engineering",
  "BS Management of Applied Chemistry",
  "BS Restaurant Entrepreneurship",
  "BS/M Applied Mathematics with Specialization in Mathematical Finance",
  "BS Applied Mathematics - Master in Data Science ",
  "BS Applied Physics/BS Materials Science and Engineering",
  "BS Biology",
  "BS Chemistry",
  "BS Chemistry/BS Materials Science and Engineering",
  "BS Computer Engineering",
  "BS Computer Science",
  "BS Computer Science - BS Digital Game Design and Development",
  "BS/MS Computer Science",
  "BS Electronics Engineering ",
  "BS Environmental Science",
  "BS Health Sciences",
  "BS Life Sciences",
  "BS Management Information Systems",
  "BS Management Information Systems/MS Computer Science",
  "BS Mathematics",
  "BS Physics",
  "AB Chinese Studies",
  "AB Communication",
  "AB Development Studies",
  "AB Economics",
  "AB Economics (Honors)",
  "AB Management Economics",
  "AB European Studies",
  "AB History",
  "AB Diplomacy and International Relations with Specialization in East and Southeast Asian Studies",
  "AB Political Science",
  "AB/MA Political Science – Global Politics",
  "AB Political Science – Masters in Public Management",
  "AB Psychology",
  "BS Psychology",
  "AB Sociology,"
]

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

const ResponseDetails = ({ anchor, title, open, onClose, onNextEntry, onPrevEntry, edit, endEdit, onDelete, onCancelEdit }) => {
  const [updatedDetails, setUpdatedDetails] = useState(null);
  useEffect(() => {
    if (open) setUpdatedDetails(open)
  }, [open])
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
  const handleEdit = () => {
    startEditMode();
    handleClose();
  }

  useEffect(() => {
    if (edit) {
      startEditMode()
    } else {
      endEdit()
      endEditMode()
    }
  }, [open])

  const onSubmit = (data) => {
    // TODO: update response
  }

  const handleCancelEdit = () => {
    endEditMode()
    endEdit()
    // onCancelEdit()
  }

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
      <Box>
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
            { !isEditMode &&
              <>
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
              </>
            }
            <p style={{ color: colors.gray[700], margin: 'auto 0', fontSize: '16px', fontWeight: 500 }}>
              { isEditMode ? 'Edit response' : title }
            </p>
          </Box>
          {
            isEditMode ?
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Button
                variant='outlined'
                color='error'
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                type="submit"
              >
                Save
              </Button>
            </Box>
            :
            <MoreVert
              onClick={handleClick}
              sx={{
                cursor: 'pointer',
                color: colors.gray[500]
              }}
            />
          }
          <StyledMenu
            MenuListProps={{
              'aria-labelledby': 'customized-button',
            }}
            anchorEl={anchorEl}
            
            open={menuOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit} disableRipple>
              Edit
            </MenuItem>
            <DeleteMenuItem onClick={onDelete} disableRipple>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '32px 24px'
            }}
          >
            <TextField
              defaultValue={updatedDetails?.fullName}
              value={updatedDetails?.fullName}
              fullWidth
              label='Full name'
              name='fullName'
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, fullName: e.target.value })}
              size="small"
              type="text"
            />
            <TextField
              defaultValue={updatedDetails?.email}
              value={updatedDetails?.email}
              fullWidth
              label='Email'
              name='email'
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, email: e.target.value })}
              size="small"
              type="text"
            />
            <TextField
              defaultValue={updatedDetails?.idNum}
              value={updatedDetails?.idNum}
              fullWidth
              label='ID Number'
              name='idNum'
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, idNum: e.target.value })}
              size="small"
              type="number"
            />
            <Autocomplete 
              disablePortal
              options={[ '1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year' ]}
              defaultValue={updatedDetails?.year}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
            <Autocomplete
              disablePortal
              options={courses}
              defaultValue={updatedDetails?.course}
              renderInput={(params) => <TextField {...params} label="Course" />}
            />
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
      </Box>
    </Drawer>
  )
}

export default ResponseDetails