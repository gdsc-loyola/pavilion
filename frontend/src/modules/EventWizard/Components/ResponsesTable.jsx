import React from 'react';
import { Checkbox, styled, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { colors, typography } from '$lib/theme';

import emptyState from '$static/assets/emptyState.svg';

const ResponsesTable = ({
  columns,
  rows,
  page,
  onCellClick,
  selectionModel,
  onSelectionModelChange,
  sortModel,
}) => {
  const CustomCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
      color: colors.green[300],
    },
  });

  const NoRows = () => {
    return (
      <Box
            sx={{
              marginTop: '2.5rem',
              marginBottom: '0',
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
            <Typography variant="h4" fontWeight={700}>
              We can’t seem to find what you’re looking for...
            </Typography>
          </Box>
    )
  }

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
      disableSelectionOnClick
      sx={{
        border: 'none',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.gray[100],
          color: colors.gray[500],
          border: 'none',
          padding: '0 34px',
        },
        '& .MuiDataGrid-columnSeparator--sideRight': {
          display: 'none',
        },
        '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer': {
          display: 'none',
        },
        '& .Mui-selected': {
          backgroundColor: `${colors.blue[200]} !important`,
        },
        '& .MuiDataGrid-row': {
          padding: '0 40px',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: colors.gray[100],
        },
        '& .MuiDataGrid-row:nth-child(even)': {
          backgroundColor: colors.blue[50],
        },
        '& .MuiDataGrid-row:nth-child(even):hover': {
          backgroundColor: colors.gray[100],
        },
        '& .MuiDataGrid-cell': {
          border: 'none',
          outline: 'none !important',
          cursor: 'pointer',
        },
        '& .MuiDataGrid-menuList': {
          padding: '0 !important',
        },
      }}
      components={{
        BaseCheckbox: CustomCheckbox,
        NoRowsOverlay: () => <NoRows />,
      }}
      sortModel={sortModel}
    />
  );
};

export default ResponsesTable;
