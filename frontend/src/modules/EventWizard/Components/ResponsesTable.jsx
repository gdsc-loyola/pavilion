import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const ResponsesTable = ({ columns, rows }) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      pageSize={5}
      rowsPerPageOptions={[7]}
      checkboxSelection
      autoHeight
      sx={{
        border: 'none',
      }}
    />
  );
};

export default ResponsesTable;
