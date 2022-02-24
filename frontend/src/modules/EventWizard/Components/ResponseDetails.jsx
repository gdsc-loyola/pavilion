import React from 'react'
import { Drawer } from '@mui/material'

const ResponseDetails = ({ anchor, open, onClose }) => {
  return (
    <Drawer
      anchor={anchor}
      open={open ? true : false}
      onClose={onClose}
    >
      { open?.id }
      { open?.fullName }
    </Drawer>
  )
}

export default ResponseDetails