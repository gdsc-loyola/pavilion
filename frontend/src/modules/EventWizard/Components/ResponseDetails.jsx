import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Button,
  styled,
  Menu,
  MenuItem as MItem,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, MoreVert } from '@mui/icons-material';
import { colors } from '$lib/theme';
import { useBoolean } from '$lib/utils/useBoolean';
import '$stylesheets/org/ResponseDetails.scss';

import Banner from './Banner';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const courses = [
  'AB Art Management',
  'BFA Major in Creative Writing',
  'BFA Major in Information Design',
  'BFA Major in Theater Arts',
  'AB Humanities',
  'AB Interdisciplinary Studies',
  'AB Literature-English',
  'AB Literature-Filipino (Filipino-Panitikan)',
  'AB Philosophy',
  'BS Communications Technology Management',
  'BS Information Technology Entrepreneurship',
  'BS Legal Management',
  'BS Management',
  'BS Management (Honors)',
  'BS Management Engineering',
  'BS Management of Applied Chemistry',
  'BS Restaurant Entrepreneurship',
  'BS/M Applied Mathematics with Specialization in Mathematical Finance',
  'BS Applied Mathematics - Master in Data Science ',
  'BS Applied Physics/BS Materials Science and Engineering',
  'BS Biology',
  'BS Chemistry',
  'BS Chemistry/BS Materials Science and Engineering',
  'BS Computer Engineering',
  'BS Computer Science',
  'BS Computer Science - BS Digital Game Design and Development',
  'BS/MS Computer Science',
  'BS Electronics Engineering ',
  'BS Environmental Science',
  'BS Health Sciences',
  'BS Life Sciences',
  'BS Management Information Systems',
  'BS Management Information Systems/MS Computer Science',
  'BS Mathematics',
  'BS Physics',
  'AB Chinese Studies',
  'AB Communication',
  'AB Development Studies',
  'AB Economics',
  'AB Economics (Honors)',
  'AB Management Economics',
  'AB European Studies',
  'AB History',
  'AB Diplomacy and International Relations with Specialization in East and Southeast Asian Studies',
  'AB Political Science',
  'AB/MA Political Science – Global Politics',
  'AB Political Science – Masters in Public Management',
  'AB Psychology',
  'BS Psychology',
  'AB Sociology,',
];

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRaidus: 6,
    border: `1px solid ${theme.colors.gray[300]}`,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
  '& .MuiMenu-list': {
    margin: 0,
    padding: 0,
  },
}));

const MenuItem = styled(MItem)({
  fontSize: '14px',
  fontWeight: 400,
  padding: '0.8rem 4.5rem',
  color: colors.gray[700],
  justifyContent: 'center',
  '&.MuiMenuItem-root:hover': {
    backgroundColor: colors.blue[100],
  },
});

const DeleteMenuItem = styled(MItem)({
  fontSize: '14px',
  fontWeight: 400,
  padding: '0.8rem 4.5rem',
  color: colors.red[300],
  justifyContent: 'center',
  '&.MuiMenuItem-root:hover': {
    backgroundColor: colors.red[100],
  },
});

const EntryField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const EntryFieldTitle = styled(Typography)({
  fontSize: '14px',
  color: colors.gray[500],
});

const EntryFieldText = styled(Typography)({
  fontSize: '14px',
  color: colors.gray[700],
});

const ResponseDetails = ({
  anchor,
  title,
  open,
  onClose,
  onNextEntry,
  onPrevEntry,
  edit,
  endEdit,
  onDelete,
  onCancelEdit,
  showCloseAndSave,
  handleSaveDetails,
  isSaveConfirmed,
  isCancelEdit,
}) => {
  const [updatedDetails, setUpdatedDetails] = useState(null);
  useEffect(() => {
    if (open) setUpdatedDetails(open);
  }, [open]);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuOpen = Boolean(anchorEl);

  const submissionDateTime = new Date(open?.date_submitted);
  const updatedDateTime = open?.last_updated ? new Date(open?.last_updated) : null;

  const {
    value: isSaveBannerVisible,
    setFalse: hideSaveBanner,
    setTrue: showSaveBanner,
  } = useBoolean();
  useEffect(() => {
    if (isSaveBannerVisible) {
      setTimeout(() => {
        hideSaveBanner();
      }, 3000);
    }
  }, [isSaveBannerVisible]);
  const { value: isEditMode, setFalse: endEditMode, setTrue: startEditMode } = useBoolean();
  const handleEdit = () => {
    startEditMode();
    handleClose();
  };

  useEffect(() => {
    if (edit) {
      startEditMode();
    } else {
      endEdit();
      endEditMode();
    }
  }, [open]);

  useEffect(() => {
    edit ? startEditMode() : endEditMode();
  }, [edit]);

  useEffect(() => {
    if (!isEditMode && open) {
      setUpdatedDetails(open);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isSaveConfirmed) {
      handleSaveDetails(open, updatedDetails);
      onClose();
    }
  }, [isSaveConfirmed]);

  useEffect(() => {
    isCancelEdit && endEditMode();
  }, [isCancelEdit]);

  const onSubmit = () => {
    updatedDetails.last_updated = new Date().toISOString();
    handleSaveDetails(open, updatedDetails);
    endEditMode();
    showSaveBanner();
  };

  const handleCancelEdit = () => {
    if (JSON.stringify(open) !== JSON.stringify(updatedDetails)) {
      onCancelEdit();
    } else {
      endEditMode();
      endEdit();
    }
  };

  const closeTabWarning = (e) => {
    if (JSON.stringify(open) !== JSON.stringify(updatedDetails)) {
      e.preventDefault();
      showCloseAndSave();
    } else {
      onClose();
    }
  };

  useEffect(() => {
    if (JSON.stringify(open) !== JSON.stringify(updatedDetails)) {
      window.addEventListener('beforeunload', closeTabWarning);
    } else {
      window.removeEventListener('beforeunload', closeTabWarning);
    }
  }, [updatedDetails]);

  return (
    <Drawer
      anchor={anchor}
      open={open ? true : false}
      onClose={closeTabWarning}
      BackdropProps={{
        sx: {
          backgroundColor: 'transparent',
        },
      }}
      PaperProps={{
        sx: {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08), 0px 4px 10px rgba(0, 0, 0, 0.08)',
          width: '34%',
        },
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
            padding: '20px 24px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {!isEditMode && (
              <>
                <Button
                  variant="outlined"
                  sx={{
                    padding: '4px',
                    minWidth: 0,
                  }}
                  onClick={onPrevEntry}
                >
                  <KeyboardArrowUp />
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    padding: '4px',
                    minWidth: 0,
                  }}
                  onClick={onNextEntry}
                >
                  <KeyboardArrowDown />
                </Button>
              </>
            )}
            <p
              style={{
                color: colors.gray[700],
                margin: 'auto 0',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {isEditMode ? 'Edit response' : title}
            </p>
          </Box>
          {isEditMode ? (
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Button variant="outlined" color="error" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button variant="outlined" onClick={onSubmit}>
                Save
              </Button>
            </Box>
          ) : (
            <MoreVert
              onClick={handleClick}
              sx={{
                cursor: 'pointer',
                color: colors.gray[500],
              }}
            />
          )}
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
            {open?.id}. {open?.name}
          </p>
          <p
            style={{
              color: colors.gray[500],
              fontSize: '14px',
              margin: 0,
              padding: 0,
            }}
          >
            Submitted on {months[submissionDateTime.getUTCMonth()]}{' '}
            {submissionDateTime.getUTCDate()}, {submissionDateTime.getUTCFullYear()} at{' '}
            {submissionDateTime.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>
          {open?.last_updated && (
            <p
              style={{
                color: colors.gray[500],
                fontSize: '14px',
                margin: '6px 0 0 0',
                padding: 0,
              }}
            >
              Updated on {months[updatedDateTime.getUTCMonth()]} {updatedDateTime.getUTCDate()},{' '}
              {updatedDateTime.getUTCFullYear()} at{' '}
              {updatedDateTime.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </p>
          )}
        </Box>
        {isEditMode ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '32px 24px 24px',
            }}
          >
            <TextField
              defaultValue={updatedDetails?.name}
              value={updatedDetails?.name}
              fullWidth
              label="Full name"
              name="name"
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}
              size="small"
              type="text"
            />
            <TextField
              defaultValue={updatedDetails?.email}
              value={updatedDetails?.email}
              fullWidth
              label="Email"
              name="email"
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, email: e.target.value })}
              size="small"
              type="text"
            />
            <TextField
              defaultValue={updatedDetails?.id_number}
              value={updatedDetails?.id_number}
              fullWidth
              label="ID Number"
              name="id_number"
              onChange={(e) => setUpdatedDetails({ ...updatedDetails, id_number: e.target.value })}
              size="small"
              type="number"
            />
            <Autocomplete
              disablePortal
              options={['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year']}
              defaultValue={updatedDetails?.year}
              renderInput={(params) => <TextField {...params} label="Year" />}
              onChange={(e, value) => setUpdatedDetails({ ...updatedDetails, year: value })}
            />
            <Autocomplete
              disablePortal
              options={courses}
              defaultValue={updatedDetails?.course}
              renderInput={(params) => <TextField {...params} label="Course" />}
              onChange={(e, value) => setUpdatedDetails({ ...updatedDetails, course: value })}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '32px 24px 24px',
            }}
          >
            <EntryField>
              <EntryFieldTitle>Full name</EntryFieldTitle>
              <EntryFieldText>{open?.name}</EntryFieldText>
            </EntryField>
            <EntryField>
              <EntryFieldTitle>Email</EntryFieldTitle>
              <EntryFieldText>{open?.email}</EntryFieldText>
            </EntryField>
            <EntryField>
              <EntryFieldTitle>ID Number</EntryFieldTitle>
              <EntryFieldText>{open?.id_number}</EntryFieldText>
            </EntryField>
            <EntryField>
              <EntryFieldTitle>Year level</EntryFieldTitle>
              <EntryFieldText>{open?.year}</EntryFieldText>
            </EntryField>
            <EntryField>
              <EntryFieldTitle>Course</EntryFieldTitle>
              <EntryFieldText>{open?.course}</EntryFieldText>
            </EntryField>
          </Box>
        )}
        <Box
          sx={{
            padding: '0 24px',
          }}
        >
          <Banner show={isSaveBannerVisible} label={'Event was successfully updated!'} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default ResponseDetails;
