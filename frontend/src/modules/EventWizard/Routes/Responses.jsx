import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Switch, Checkbox, Menu, MenuItem as MItem, styled, createTheme, ThemeProvider } from '@mui/material';
import { KeyboardArrowDown, FileDownload as DownloadIcon } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid'
import { colors, typography } from '$lib/theme';
import { useBoolean } from '$lib/utils/useBoolean';

import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import LinkIcon from '../components/LinkIcon';
import Container from '../components/Container'
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

const DefaultTheme = createTheme({
  palette: {
    primary: { main: colors.blue[400] },
    secondary: { main: colors.gray[300] },
    disabled: { main: colors.gray[400] }
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
})

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const rows = [{
  "id": 1,
  "fullName": "Leda Clubley",
  "email": "lclubley0@un.org",
  "dateCreated": "2022-01-06T06:04:54Z",
  "updatedAt": "2021-12-31T03:24:23Z",
  "idNum": "3",
  "year": "1st Year",
  "course": "Bluezoom"
}, {
  "id": 2,
  "fullName": "Jesse Stutte",
  "email": "jstutte1@redcross.org",
  "dateCreated": "2022-02-16T18:29:57Z",
  "updatedAt": "2022-02-02T09:34:47Z",
  "idNum": "27",
  "year": "3rd Year",
  "course": "Jamia"
}, {
  "id": 3,
  "fullName": "Billie Finnes",
  "email": "bfinnes2@accuweather.com",
  "dateCreated": "2022-02-22T11:48:35Z",
  "idNum": "01",
  "year": "1st Year",
  "course": "Dynabox"
}, {
  "id": 4,
  "fullName": "Cordula Hadland",
  "email": "chadland3@wikimedia.org",
  "dateCreated": "2022-02-18T16:13:13Z",
  "idNum": "89555",
  "year": "1st Year",
  "course": "Topicware"
}, {
  "id": 5,
  "fullName": "Khalil Joannet",
  "email": "kjoannet4@nih.gov",
  "dateCreated": "2021-12-21T04:07:47Z",
  "updatedAt": "2022-01-10T12:05:45Z",
  "idNum": "05",
  "year": "4th Year",
  "course": "Quamba"
}, {
  "id": 6,
  "fullName": "Emmalyn Burburough",
  "email": "eburburough5@umich.edu",
  "dateCreated": "2022-01-05T12:32:05Z",
  "updatedAt": "2022-02-17T00:10:35Z",
  "idNum": "744",
  "year": "2nd Year",
  "course": "Ailane"
}, {
  "id": 7,
  "fullName": "Cristie Gerring",
  "email": "cgerring6@elpais.com",
  "dateCreated": "2022-01-13T00:56:04Z",
  "updatedAt": "2022-01-23T05:11:42Z",
  "idNum": "6",
  "year": "2nd Year",
  "course": "Edgeify"
}, {
  "id": 8,
  "fullName": "Traver Schwaiger",
  "email": "tschwaiger7@apple.com",
  "dateCreated": "2022-02-20T13:03:26Z",
  "updatedAt": "2022-02-18T17:38:42Z",
  "idNum": "06097",
  "year": "4th Year",
  "course": "Oyonder"
}, {
  "id": 9,
  "fullName": "Addie Skym",
  "email": "askym8@nba.com",
  "dateCreated": "2022-02-10T04:16:15Z",
  "updatedAt": "2022-02-01T21:16:13Z",
  "idNum": "886",
  "year": "3rd Year",
  "course": "Skinder"
}, {
  "id": 10,
  "fullName": "Cathi Flann",
  "email": "cflann9@de.vu",
  "dateCreated": "2022-01-09T21:46:41Z",
  "idNum": "663",
  "year": "1st Year",
  "course": "Tagopia"
}]

const ToggleSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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

const CustomCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: colors.green[300],
  },
  '&.MuiCheckbox-indeterminate': {
    color: colors.green[300],
  },
})

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
}))

const FileDownload = styled(DownloadIcon)({
  '&.MuiIcon-colorDisabled': {
    color: colors.gray[400],
  }
})

const Responses = () => {
  const { eventName } = useParams()
  const [responses, setResponses] = useState(rows)
  const [page, setPage] = useState(0)
  const [selectedItems, setSelectedItems] = useState([])
  const [search, setSearch] = useState('')
  const [openDetails, setOpenDetails] = useState(null)
  const [accepting, setAccepting] = useState(true)
  useEffect(() => {
    if (!accepting) {
      // TODO: update accepting status
    }
  }, [accepting])
  const [deleteEntry, setDeleteEntry] = useState(null)
  const onConfirmDeleteEntry = (entry) => {
    alert(`deleting entry no. ${entry}`)
    setDeleteEntry(null)
  }

  const [sortModel, setSortModel] = useState([{ field: 'id', sort: 'asc' }])
  useEffect(() => {
    console.log('sortModel', sortModel)
  }, [sortModel])

  const { value: isAcceptingModalOpen, setFalse: closeAcceptingModal, setTrue: openAcceptingModal } = useBoolean();
  const { value: isBannerVisible, setFalse: hideBanner, setTrue: showBanner } = useBoolean();
  const { value: isEdit, setFalse: endEdit, setTrue: startEdit } = useBoolean();

  useEffect(() => {
    if (isBannerVisible) {
      setTimeout(() => {
        hideBanner()
      }, 3000)
    }
  }, [isBannerVisible])

  const handleAcceptToggle = (event) => {
    if (!event.target.checked) {
      openAcceptingModal()
    }
  }

  const handleEdit = (response) => {
    startEdit()
    setOpenDetails(response)
  }

  const handleCloseDetails = () => {
    endEdit()
    setOpenDetails(null)
  }

  const columns = [
    { field: 'id', type: 'number', headerName: 'ID #', valueFormatter: (params) => `#${('000' + params.value).substr(-3)}`, sortable: false },
    { field: 'fullName', headerName: 'Full Name', flex: 1, sortable: false },
    { field: 'email', headerName: 'Email', flex: 1, sortable: false },
    { field: 'dateCreated', type: 'dateTime', headerName: 'Submission Date', valueFormatter: (params) => { 
      const date = new Date(params.value)
      return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
    }, flex: 0.5, sortable: false },
    { field: 'updatedAt', type: 'dateTime', headerName: 'Last Updated On', valueFormatter: (params) => { 
      const date = new Date(params.value)
      return !params.value ? '-' : `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
    }, flex: 0.5, sortable: false },
    { field: 'actions', type: 'actions', getActions: (params) => [
      <GridActionsCellItem 
        key={params.id}
        label='Edit'
        onClick={() => handleEdit(responses[params.row.id - 1])}
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
        label='Delete'
        onClick={() => setDeleteEntry(params.id)}
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
      />
    ], flex: 0.5,}
  ]

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
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        borderLeft: '1px solid #D1D5DB',
        padding: '4px 24px',
      }}>
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
          <MenuItem selected={sortModel[0].field === 'dateCreated'} onClick={() => setSortModel([{field: 'dateCreated', sort: sortModel[0]['sort']}])} disableRipple>
            Submission date
          </MenuItem>
          <MenuItem selected={sortModel[0].field === 'updatedAt'} onClick={() => setSortModel([{field: 'updatedAt', sort: sortModel[0]['sort']}])} disableRipple>
            Last updated
          </MenuItem>
          <MenuItem selected={sortModel[0].field === 'fullName'} onClick={() => setSortModel([{field: 'fullName', sort: sortModel[0]['sort']}])} disableRipple>
            Name
          </MenuItem>
          <MenuItem selected={sortModel[0].field === 'email'} onClick={() => setSortModel([{field: 'email', sort: sortModel[0]['sort']}])} disableRipple>
            Email
          </MenuItem>
          <MenuItem selected={sortModel[0].field === 'id'} onClick={() => setSortModel([{field: 'id', sort: sortModel[0]['sort']}])} disableRipple>
            ID #
          </MenuItem>
        </StyledMenu>
      </Box>
    )
  }

  return (
    <Layout>
      <TopBar eventName={eventName}>
        <Box
          sx={{
            display: 'flex',
            gap: '16px'
          }}
        >
          <ThemeProvider theme={DefaultTheme}>
            <Button sx={{
              padding: '.5rem 1.5rem',
              color: colors.blue[300],
              textTransform: 'none'
            }} variant="outlined" onClick={showBanner}>
              <LinkIcon />
              <p style={{ margin: 'auto 0 auto 4px'}}>Copy event link</p>
            </Button>
            <Button sx={{
              padding: '.5rem 1.5rem',
              color: colors.blue[300],
              textTransform: 'none',
              boxShadow: 'none',
            }} disabled={selectedItems.length > 0 && selectedItems.length <= responses.length} variant={selectedItems.length > 0 ? 'contained' : 'outlined'} color={selectedItems.length > 0 ? 'secondary' : 'primary'}>
            <FileDownload color={selectedItems.length > 0 && selectedItems.length <= responses.length ? 'disabled' : 'primary'} />
              <p style={{ margin: 'auto 0 auto 4px', color: selectedItems.length > 0 ? colors.gray[400] : colors.blue[300] }}>Download all</p>
            </Button>
          </ThemeProvider>
        </Box>
      </TopBar>

      <Container>
        <Typography variant='h6' fontWeight={700}>
        {
          // TODO: number of responses
        }
          Responses ({responses.length})
        </Typography>

        <Box component={'div'} sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '2rem'
        }}>
          <Searchbar onChange={(e) => setSearch(e.target.value)} value={search} label="Search responses" placeholder="Search responses" size='medium' />
          <Box sx={{
            display: 'flex'
          }}>
            {/* pages */}
            <Box sx={{
              display: 'flex',
              borderRight: '1px solid #D1D5DB',
              paddingRight: '24px',
              marginRight: '24px',
              alignItems: 'center',
              gap: '16px'
            }}>
              <Typography component="p">
                Page {page+1} of {Math.ceil(responses.length/7)}
              </Typography>
              <div onClick={() => page < 1 ? null : setPage(page-1)}>
                <LeftArrow />
              </div>
              <div onClick={() => page+1 >= Math.ceil(responses.length/7) ? null : setPage(page+1)}>
                <RightArrow />
              </div>
            </Box>
            
            {/* accept toggle */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Typography component="p">
                Accepting responses
              </Typography>
              <ToggleSwitch defaultChecked={accepting} value={accepting} onChange={(e) => handleAcceptToggle(e)} />
            </Box>
          </Box>
        </Box>

        {
          responses.length > 0 ?
          <Box>
            <Box sx={{
              display: 'flex',
              padding: '16px 40px'
            }}>
              <Box onClick={() => selectedItems.length === 0 ? setSelectedItems(responses.map(res => res.id)) : setSelectedItems([])} sx={{
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                alignContent: 'center',
                gap: '24px',
                paddingRight: '24px',
              }}>
                <CustomCheckbox checked={selectedItems.length === responses.length} indeterminate={selectedItems.length < responses.length && selectedItems.length > 0 } />
                {
                  selectedItems.length > 0 ?
                  `${selectedItems.length} of ${responses.length} responses` : 'Select all responses'
                }
              </Box>
              {
                selectedItems.length > 0 ?
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                  <Box sx={{
                    display: 'flex',
                    color: colors.blue[300],
                    gap: '4px',
                    borderRight: '1px solid #D1D5DB',
                    borderLeft: '1px solid #D1D5DB',
                    padding: '4px 24px',
                    cursor: 'pointer'
                  }}>
                    <FileDownload />
                    Download
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    color: colors.gray[700],
                    gap: '4px',
                    paddingLeft: '24px',
                    cursor: 'pointer'
                  }}>
                    <DeleteIcon />
                    Delete
                  </Box>
                </Box>
                :
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                  <SortByButton />
                  <Box onClick={() => setSortModel([{sort: sortModel[0]['sort'] === 'asc' ? 'desc' : 'asc', field: sortModel[0].field}])} sx={{
                    cursor: 'pointer',
                  }}>
                    <SortIcon />
                  </Box>
                </Box>
              }
            </Box>
            <ResponsesTable
              page={page}
              columns={columns}
              rows={rows}
              selectionModel={selectedItems} 
              onSelectionModelChange={setSelectedItems}
              sortModel={sortModel}
              onCellClick={(param, event) => {
                console.log(param.field)
                if (param.field === "__check__" || param.field === "actions") return event.stopPropagation()
                setOpenDetails(responses[param.row.id - 1])
              }}
            />
          </Box>
          :
          <Box
            sx={{
              marginTop: '3rem',
              marginBottom: isBannerVisible ? '0' : '4rem',
              padding: '2rem',
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
            <img src={emptyState} style={{ width: '400px' }} />
            <h4>You don&apos;t have any responses yet!</h4>
            <Button>
              <LinkIcon white />
              <p style={{ margin: 'auto 0 auto 4px'}}>Copy event link</p>
            </Button>
          </Box>
        }

        <Banner show={isBannerVisible} label={"Event link copied to clipboard!"} />
      </Container>

      <Modal
        open={isAcceptingModalOpen}
        onClose={closeAcceptingModal}
        withTextField={false}
        warning={true}
        title="Stop accepting responses"
        subtitle="This event won&apos;t receive new respondents anymore."
        onSubmit={() => setAccepting(false)}
        leftButtonProps={{
          label: 'Never mind',
          onClick: closeAcceptingModal,
        }}
        rightButtonProps={{
          label: 'Stop accepting',
          type: 'submit'
        }}
      />

      <Modal
        open={deleteEntry}
        onClose={() => setDeleteEntry(null)}
        withTextField={false}
        warning={true}
        title="Delete response"
        subtitle="This will delete all the information about this entry."
        onSubmit={() => onConfirmDeleteEntry(deleteEntry)}
        leftButtonProps={{
          label: 'Never mind',
          onClick: () => setDeleteEntry(null),
        }}
        rightButtonProps={{
          label: 'Delete response',
          type: 'submit'
        }}
      />

      <ResponseDetails
        edit={isEdit}
        endEdit={endEdit}
        anchor={'right'}
        open={openDetails}
        title={`${openDetails?.id} of ${responses.length} responses`}
        onClose={handleCloseDetails}
        onNextEntry={() => openDetails.id >= responses.length ? null : setOpenDetails(responses[(openDetails.id - 1) + 1])}
        onPrevEntry={() => openDetails.id <= 1 ? null : setOpenDetails(responses[(openDetails.id - 1) - 1])}
        onDelete={() => setDeleteEntry(openDetails)}
      />
    </Layout>
  )
}

export default Responses;