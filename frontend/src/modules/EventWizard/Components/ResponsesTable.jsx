import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { colors } from '$lib/theme'
import '$stylesheets/org/EventResponses.scss'

const ResponsesTable = ({ columns, rows, page, onPageSizeChange }) => {
  return (
    <DataGrid
      page={page}
      hideFooterPagination
      columns={columns}
      rows={rows}
      pageSize={7}
      rowsPerPageOptions={[7]}
      checkboxSelection
      autoHeight
      sx={{
        border: 'none',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.gray[100],
          color: colors.gray[500],
          borderBottom: 'none'
        },
        '& .MuiDataGrid-columnSeparator--sideRight': {
          display: 'none'
        },
      }}
      getRowClassName={(params) => params.row.id % 2 == 0 ? 'even-data-row' : 'odd-data-row'}
    />
  )
}

export default ResponsesTable