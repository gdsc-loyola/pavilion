import React from 'react'
import { Drawer, Box, Button } from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const ResponseDetails = ({ anchor, open, onClose }) => {
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
          padding: '20px 24px'
        }
      }}
    >
      <Box sx={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      }}>
        <Button variant='outlined' sx={{
          padding: 0,
        }}>
          <KeyboardArrowUp />
        </Button>
        <Button variant='outlined' sx={{
          padding: 0,
        }}>
          <KeyboardArrowDown />
        </Button>
      </Box>
      { open?.id }
      { open?.fullName }
    </Drawer>
  )
}

export default ResponseDetails