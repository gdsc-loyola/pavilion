import React from 'react'
import { Checkbox, styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { colors } from '$lib/theme'

const ResponsesTable = ({ columns, rows, page, onCellClick, selectionModel, onSelectionModelChange, sortModel }) => {
  const CustomCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
      color: colors.green[300],
    },
  })

  return (
    <DataGrid
      page={page}
      hideFooterPagination
      hideFooter
      columns={columns}
      rows={rows}
      pageSize={7}
      rowsPerPageOptions={[7]}
      checkboxSelection
      autoHeight
      disableColumnMenu
      selectionModel={selectionModel}
      onSelectionModelChange={onSelectionModelChange}
      onCellClick={onCellClick}
      sx={{
        border: 'none',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.gray[100],
          color: colors.gray[500],
          border: 'none',
          padding: '0 34px',
        },
        '& .MuiDataGrid-columnSeparator--sideRight': {
          display: 'none'
        },
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
          display: "none"
        },
        "& .Mui-selected": {
          backgroundColor: `${colors.blue[200]} !important`,
        },
        '& .MuiDataGrid-row': {
          padding: '0 40px',
        },
        '& .MuiDataGrid-row:nth-child(even)': {
          backgroundColor: colors.blue[50]
        },
        '& .MuiDataGrid-cell': {
          border: 'none',
          outline: 'none !important',
        }
      }}
      components={{
        BaseCheckbox: CustomCheckbox
      }}
      sortModel={sortModel}
    />
  )
}

export default ResponsesTable