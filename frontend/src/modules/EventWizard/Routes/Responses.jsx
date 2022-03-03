import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Switch,
  Checkbox,
  Menu,
  MenuItem as MItem,
  styled,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { KeyboardArrowDown, FileDownload as DownloadIcon } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { CSVLink } from 'react-csv';
import { colors, typography } from '$lib/theme';
import { useBoolean } from '$lib/utils/useBoolean';

import http from '$lib/http';
import { useAdminUser } from '$lib/context/AdminContext';
import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import LinkIcon from '../components/LinkIcon';
import Searchbar from '$components/Searchbar';
import LeftArrow from '../components/LeftArrow';
import RightArrow from '../components/RightArrow';
import emptyState from '$static/assets/emptyState.svg';
import Modal from '../components/Modal';
import Banner from '../components/Banner';
import DeleteIcon from '../components/DeleteIcon';
import ResponsesTable from '../components/ResponsesTable';
import SortIcon from '../components/SortIcon';
import ResponseDetails from '../components/ResponseDetails';

const CSVHeaders = [
  { label: 'ID', key: 'id' },
  { label: 'Event', key: 'event.name' },
  { label: 'Name', key: 'name' },
  { label: 'ID Number', key: 'id_number' },
  { label: 'Email', key: 'email' },
  { label: 'Year', key: 'year' },
  { label: 'Course', key: 'course' },
  { label: 'Submission Date', key: 'date_submitted' },
  { label: 'Last Updated On', key: 'last_updated' },
]

const DefaultTheme = createTheme({
  palette: {
    primary: { main: colors.blue[400] },
    secondary: { main: colors.gray[300] },
    disabled: { main: colors.gray[400] },
  },
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const CustomContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 3rem',
  height: '75vh',
  '.MuiButton-root': {
    fontWeight: theme.fontWeight.med,
  },
  'MuiContainer-root': {
    maxWidth: '100%',
    paddingLeft: '68px !important',
    paddingRight: '68px !important',
  },
  h1: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
  },
  position: 'relative',
}));

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: colors.green[300],
  },
  '&.MuiCheckbox-indeterminate': {
    color: colors.green[300],
  },
});

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
  padding: '1rem 2rem',
  color: colors.gray[500],
  justifyContent: 'center',
  '&.MuiMenuItem-root:hover': {
    backgroundColor: colors.blue[100],
  },
  '&.Mui-selected': {
    backgroundColor: colors.blue[300],
    color: '#fff',
  },
});

const FileDownload = styled(DownloadIcon)({
  '&.MuiIcon-colorDisabled': {
    color: colors.gray[400],
  },
});

const Responses = () => {
  const { org, accessToken, userData } = useAdminUser();
  const [accepting, setAccepting] = useState(false);
  useEffect(() => {
    fetchResponses();
  }, []);
  useEffect(() => {
    if (org) {
      console.log('org', org);
      fetchResponses();
    }
  }, [org]);
  const [eventLink, setEventLink] = useState('');
  const fetchResponses = async () => {
    // TODO: fetch responses with event ID
    const res = await http.get(`/events/1`);
    console.log('res', res.data);
    if (Array.isArray(res.data)) {
      setResponses(res.data);
      setOriginalResponses(res.data);
      const event = res.data[0].event;
      console.log('event', event);
      setAccepting(event.accepting_responses ?? false);
      setEventName(event.name);
      // TODO pav base url
      setEventLink(
        `https://pavilion.gdscloyola.org/organizations/${org?.short_name.toLowerCase()}/${event.id}`
      );
    } else {
      const event = res.data;
      console.log('event', event);
      setAccepting(event.accepting_responses ?? false);
      setEventName(event.name);
      setEventLink(
        `https://pavilion.gdscloyola.org/organizations/${org?.short_name.toLowerCase()}/${event.id}`
      );
    }
  };
  const { eventNameParam } = useParams();
  const [eventName, setEventName] = useState(eventNameParam);
  const [responses, setResponses] = useState([]);
  const [originalResponses, setOriginalResponses] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (search !== '' || search !== ' ' || search != null) {
      const filtered = originalResponses.filter((row) => {
        return (
          row.name.toLowerCase().includes(search.toLowerCase()) ||
          row.email.toLowerCase().includes(search.toLowerCase()) ||
          row.course.toLowerCase().includes(search.toLowerCase())
        );
      });
      setResponses(filtered);
    } else {
      setResponses(originalResponses);
    }
  }, [search]);
  const [openDetails, setOpenDetails] = useState(null);

  const [deleteEntry, setDeleteEntry] = useState(null);
  const onConfirmDeleteEntry = async (entry) => {
    if (Array.isArray(entry)) {
      for (let i = 0; i < entry.length; i++) {
        const toDelete = entry[i];
        await http
          .delete(`/event-student/${toDelete}`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          })
          .catch((err) => {
            alert('error deleting response');
            console.log('error deleting response', err);
          });
      }
    } else {
      let entryId = Number.isInteger(entry) ? entry : entry.id;
      await http
        .delete(`/event-student/${entryId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .catch((err) => {
          alert('error deleting response');
          console.log('error deleting response', err);
        });
    }
    setDeleteEntry(null);
    hideDelete();
    fetchResponses();
  };

  const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'asc' }]);

  const {
    value: isAcceptingModalOpen,
    setFalse: closeAcceptingModal,
    setTrue: openAcceptingModal,
  } = useBoolean();
  const { value: isBannerVisible, setFalse: hideBanner, setTrue: showBanner } = useBoolean();
  const { value: isDeleteVisible, setFalse: hideDelete, setTrue: showDelete } = useBoolean();
  const { value: isEdit, setFalse: endEdit, setTrue: startEdit } = useBoolean();
  const {
    value: isCancelEdit,
    setFalse: abortCancelEdit,
    setTrue: confirmCancelEdit,
  } = useBoolean();
  const {
    value: isCloseAndSave,
    setFalse: hideCloseAndSave,
    setTrue: showCloseAndSave,
  } = useBoolean();
  const { value: isSaveConfirmed, setFalse: abortSaveConfirm, setTrue: confirmSave } = useBoolean();
  const {
    value: isSaveBannerVisible,
    setFalse: hideSaveBanner,
    setTrue: showSaveBanner,
  } = useBoolean();

  useEffect(() => {
    if (isSaveBannerVisible) {
      fetchResponses();
    }
  }, [isSaveBannerVisible]);

  useEffect(() => {
    if (isBannerVisible) {
      setTimeout(() => {
        hideBanner();
      }, 3000);
    }
    if (isSaveBannerVisible) {
      setTimeout(() => {
        hideSaveBanner();
      }, 3000);
    }
  }, [isBannerVisible, isSaveBannerVisible]);

  const handleAcceptToggle = (event) => {
    if (!event.target.checked) {
      openAcceptingModal();
    } else {
      setAccepting(event.target.checked);
      updateAcceptStatus(event.target.checked);
    }
  };

  const updateAcceptStatus = async (status) => {
    // TODO patch to event id
    const fd = new FormData();
    fd.append('accepting_responses', status);
    await http
      .patch(
        '/events/1/',
        {
          accepting_responses: status,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        fetchResponses();
        console.log('successfully updated accepting status', res);
      })
      .catch((err) => {
        alert('error');
        console.log('error updating accepting status', err);
      });
  };

  const handleEdit = (response) => {
    startEdit();
    setOpenDetails(response);
  };

  const handleCloseDetails = () => {
    endEdit();
    setOpenDetails(null);
  };

  const handleSaveDetails = async (old, update) => {
    update.last_updated = new Date().toISOString();
    await http
      .patch(`/event-student/${old.id}/`, update, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        openDetails && setOpenDetails(update);
        fetchResponses();
        !openDetails && showSaveBanner();
        endEdit();
      })
      .catch((err) => {
        alert('error');
        console.log('error updating', err);
      });
  };

  const handleCopyEventLink = () => {
    navigator.clipboard.writeText(eventLink);
    showBanner();
  };

  const ToggleSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      defaultChecked={accepting}
      checked={accepting}
      onChange={(e) => handleAcceptToggle(e)}
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      color: '#fff',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: colors.blue[300],
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: colors.blue[300],
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: colors.gray[400],
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  const columns = [
    {
      field: 'id',
      type: 'number',
      headerName: 'ID #',
      valueFormatter: (params) => `#${('000' + params.value).substr(-3)}`,
      sortable: false,
    },
    { field: 'name', headerName: 'Full Name', flex: 1, sortable: false },
    { field: 'email', headerName: 'Email', flex: 1, sortable: false },
    {
      field: 'date_submitted',
      type: 'dateTime',
      headerName: 'Submission Date',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
      },
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'last_updated',
      type: 'dateTime',
      headerName: 'Last Updated On',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return !params.value
          ? '-'
          : `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
      },
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'actions',
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          label="Edit"
          onClick={() => handleEdit(responses[responses.indexOf(params.row)])}
          showInMenu
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            padding: '0.8rem 4.5rem',
            color: colors.gray[700],
            justifyContent: 'center',
            '&.MuiMenuItem-root:hover': {
              backgroundColor: colors.blue[100],
            },
          }}
        />,
        <GridActionsCellItem
          key={params.id}
          label="Delete"
          onClick={() => {
            setDeleteEntry(params.id);
            showDelete();
          }}
          showInMenu
          sx={{
            fontSize: '14px',
            fontWeight: 400,
            padding: '0.8rem 4.5rem',
            color: colors.red[300],
            justifyContent: 'center',
            '&.MuiMenuItem-root:hover': {
              backgroundColor: colors.red[100],
            },
          }}
        />,
      ],
      flex: 0.5,
    },
  ];

  const SortByButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.target);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          borderLeft: '1px solid #D1D5DB',
          padding: '4px 24px',
        }}
      >
        <Box
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            margin: 'auto 0',
            cursor: 'pointer',
            gap: '8px',
          }}
        >
          Sort by
          <KeyboardArrowDown sx={{ width: '18px', color: colors.gray[500] }} />
        </Box>
        <StyledMenu
          MenuListProps={{
            'aria-labelledby': 'customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            selected={sortModel[0].field === 'date_submitted'}
            onClick={() => setSortModel([{ field: 'date_submitted', sort: sortModel[0]['sort'] }])}
            disableRipple
          >
            Submission date
          </MenuItem>
          <MenuItem
            selected={sortModel[0].field === 'last_updated'}
            onClick={() => setSortModel([{ field: 'last_updated', sort: sortModel[0]['sort'] }])}
            disableRipple
          >
            Last updated
          </MenuItem>
          <MenuItem
            selected={sortModel[0].field === 'name'}
            onClick={() => setSortModel([{ field: 'name', sort: sortModel[0]['sort'] }])}
            disableRipple
          >
            Name
          </MenuItem>
          <MenuItem
            selected={sortModel[0].field === 'email'}
            onClick={() => setSortModel([{ field: 'email', sort: sortModel[0]['sort'] }])}
            disableRipple
          >
            Email
          </MenuItem>
          <MenuItem
            selected={sortModel[0].field === 'id'}
            onClick={() => setSortModel([{ field: 'id', sort: sortModel[0]['sort'] }])}
            disableRipple
          >
            ID #
          </MenuItem>
        </StyledMenu>
      </Box>
    );
  };

  return (
    <Layout>
      <TopBar eventName={eventName}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <ThemeProvider theme={DefaultTheme}>
            <Button
              sx={{
                padding: '.5rem 1.5rem',
                color: colors.blue[300],
                textTransform: 'none',
              }}
              variant="outlined"
              onClick={handleCopyEventLink}
            >
              <LinkIcon />
              <p style={{ margin: 'auto 0 auto 4px' }}>Copy event link</p>
            </Button>
            <Button
              sx={{
                padding: '.5rem 1.5rem',
                color: colors.blue[300],
                textTransform: 'none',
                boxShadow: 'none',
              }}
              disabled={selectedItems.length > 0 && selectedItems.length <= responses.length}
              variant={selectedItems.length > 0 ? 'contained' : 'outlined'}
              color={selectedItems.length > 0 ? 'secondary' : 'primary'}
            >
              <FileDownload
                color={
                  selectedItems.length > 0 && selectedItems.length <= responses.length
                    ? 'disabled'
                    : 'primary'
                }
              />
                <CSVLink data={originalResponses} headers={CSVHeaders} filename={`${eventName}-respondents`} style={{
                  margin: 'auto 0 auto 4px',
                  color: selectedItems.length > 0 ? colors.gray[400] : colors.blue[300],
                }} >
                  Download all
                </CSVLink>
            </Button>
          </ThemeProvider>
        </Box>
      </TopBar>

      <CustomContainer>
        <Typography variant="h6" fontWeight={700}>
          Responses ({responses.length})
        </Typography>

        <Box
          component={'div'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '2rem',
          }}
        >
          <Searchbar
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            label="Search responses"
            placeholder="Search responses"
            size="medium"
          />
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {/* pages */}
            <Box
              sx={{
                display: 'flex',
                borderRight: '1px solid #D1D5DB',
                paddingRight: '24px',
                marginRight: '24px',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <Typography component="p">
                Page {page + 1} of {Math.ceil(responses.length / 7)}
              </Typography>
              <div onClick={() => (page < 1 ? null : setPage(page - 1))}>
                <LeftArrow />
              </div>
              <div
                onClick={() =>
                  page + 1 >= Math.ceil(responses.length / 7) ? null : setPage(page + 1)
                }
              >
                <RightArrow />
              </div>
            </Box>

            {/* accept toggle */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Typography component="p">Accepting responses</Typography>
              <ToggleSwitch />
            </Box>
          </Box>
        </Box>

        {originalResponses.length > 0 ? (
          <Box>
            <Box
              sx={{
                display: 'flex',
                padding: '16px 40px',
              }}
            >
              <Box
                onClick={() =>
                  selectedItems.length === 0
                    ? setSelectedItems(responses.map((res) => res.id))
                    : setSelectedItems([])
                }
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '24px',
                  paddingRight: '24px',
                }}
              >
                <CustomCheckbox
                  checked={selectedItems.length === originalResponses.length}
                  indeterminate={
                    selectedItems.length < responses.length && selectedItems.length > 0
                  }
                />
                {selectedItems.length > 0
                  ? `${selectedItems.length} of ${responses.length} responses`
                  : 'Select all responses'}
              </Box>
              {selectedItems.length > 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      color: colors.blue[300],
                      gap: '4px',
                      borderRight: '1px solid #D1D5DB',
                      borderLeft: '1px solid #D1D5DB',
                      padding: '4px 24px',
                      cursor: 'pointer',
                    }}
                  >
                    <FileDownload />
                    <CSVLink data={originalResponses.filter(response => selectedItems.includes(response.id))} headers={CSVHeaders} filename={`${eventName}-respondents`} style={{
                      color: colors.blue[300],
                    }}>
                      Download
                    </CSVLink>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      color: colors.gray[700],
                      gap: '4px',
                      paddingLeft: '24px',
                      cursor: 'pointer',
                    }}
                    onClick={showDelete}
                  >
                    <DeleteIcon />
                    Delete
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                >
                  <SortByButton />
                  <Box
                    onClick={() =>
                      setSortModel([
                        {
                          sort: sortModel[0]['sort'] === 'asc' ? 'desc' : 'asc',
                          field: sortModel[0].field,
                        },
                      ])
                    }
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <SortIcon />
                  </Box>
                </Box>
              )}
            </Box>
            <ResponsesTable
              page={page}
              columns={columns}
              rows={responses}
              selectionModel={selectedItems}
              onSelectionModelChange={setSelectedItems}
              sortModel={sortModel}
              onCellClick={(param, event) => {
                if (param.field === '__check__' || param.field === 'actions')
                  return event.stopPropagation();
                setOpenDetails(responses[responses.indexOf(param.row)]);
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: '2.5rem',
              marginBottom: isBannerVisible ? '0' : '4rem',
              padding: '1.5rem',
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
            <img src={emptyState} style={{ width: '370px' }} />
            <h4>You don&apos;t have any responses yet!</h4>
            <Button onClick={handleCopyEventLink}>
              <LinkIcon white />
              <p style={{ margin: 'auto 0 auto 4px' }}>Copy event link</p>
            </Button>
          </Box>
        )}

        <Banner show={isBannerVisible} label={'Event link copied to clipboard!'} />
        <Banner show={isSaveBannerVisible} label={'Response was successfully updated!'} />
      </CustomContainer>

      <Modal
        open={isAcceptingModalOpen}
        onClose={closeAcceptingModal}
        withTextField={false}
        warning={true}
        title="Stop accepting responses"
        subtitle="This event won't receive new respondents anymore."
        onSubmit={(e) => {
          e.preventDefault();
          setAccepting(false);
          updateAcceptStatus(false);
          closeAcceptingModal();
        }}
        leftButtonProps={{
          label: 'Never mind',
          onClick: closeAcceptingModal,
        }}
        rightButtonProps={{
          label: 'Stop accepting',
          type: 'submit',
        }}
      />

      <Modal
        open={isDeleteVisible}
        onClose={() => {
          setDeleteEntry(null);
          hideDelete();
        }}
        withTextField={false}
        warning={true}
        title="Delete response"
        subtitle="This will delete all the information about this entry."
        onSubmit={(e) => {
          e.preventDefault();
          deleteEntry ? onConfirmDeleteEntry(deleteEntry) : onConfirmDeleteEntry(selectedItems);
        }}
        leftButtonProps={{
          label: 'Never mind',
          onClick: () => {
            setDeleteEntry(null);
            hideDelete();
          },
        }}
        rightButtonProps={{
          label: 'Delete response',
          type: 'submit',
        }}
      />

      <Modal
        open={isCancelEdit}
        onClose={abortCancelEdit}
        withTextField={false}
        warning={true}
        title="Cancel edits"
        subtitle="This will discard all the changes you’ve done so far."
        onSubmit={() => {
          endEdit();
          abortCancelEdit();
        }}
        leftButtonProps={{
          label: 'Never mind',
          onClick: abortCancelEdit,
        }}
        rightButtonProps={{
          label: 'Discard edits',
          type: 'submit',
        }}
      />

      <Modal
        open={isCloseAndSave}
        onClose={hideCloseAndSave}
        withTextField={false}
        title="Close and save"
        subtitle="You can go back to editing this entry anytime."
        onSubmit={(e) => {
          e.preventDefault();
          confirmSave();
          hideCloseAndSave();
          endEdit();
        }}
        leftButtonProps={{
          label: 'Never mind',
          onClick: hideCloseAndSave,
        }}
        rightButtonProps={{
          label: 'Save',
          type: 'submit',
        }}
      />

      <ResponseDetails
        edit={isEdit}
        endEdit={endEdit}
        anchor={'right'}
        open={openDetails}
        title={`${responses.indexOf(openDetails) + 1} of ${responses.length} responses`}
        onClose={handleCloseDetails}
        onNextEntry={() =>
          responses.indexOf(openDetails) + 1 >= responses.length
            ? null
            : setOpenDetails(responses[responses.indexOf(openDetails) + 1])
        }
        onPrevEntry={() =>
          responses.indexOf(openDetails) < 1
            ? null
            : setOpenDetails(responses[responses.indexOf(openDetails) - 1])
        }
        onDelete={() => {
          setDeleteEntry(openDetails);
          showDelete();
        }}
        onCancelEdit={confirmCancelEdit}
        showCloseAndSave={showCloseAndSave}
        handleSaveDetails={handleSaveDetails}
        isSaveConfirmed={isSaveConfirmed}
        isCancelEdit={isCancelEdit}
      />
    </Layout>
  );
};

export default Responses;
