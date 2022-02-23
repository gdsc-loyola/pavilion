import { Button, TableCell, styled, Checkbox } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import MUITableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import compare from 'just-compare';
import React, { useRef, useState } from 'react';

const StyledTableRow = styled(MUITableRow)(({ theme }) => ({
  '&:nth-of-type(2n)': {
    backgroundColor: theme.colors.background.blue,
  },
  '&.selected': {
    background: theme.colors.blue[200],
  },
  '.status': {
    padding: '4px 8px',
    fontFamily: 'Rubik',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',

    textAlign: 'center',
  },
  '.status--draft': {
    background: theme.colors.gray[200],
    color: theme.colors.gray[500],
  },
  '.status--published': {
    background: theme.colors.green[100],
    color: theme.colors.green[400],
  },

  '.status--ongoing': {
    background: theme.colors.yellow[200],
    color: theme.colors.yellow[500],
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '.MuiPaper-root': {
    filter: 'drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.08))',
    boxShadow: 'none',
  },
  '.MuiList-root': {
    padding: 0,
  },
  '.MuiMenuItem-root': {
    justifyContent: 'center',
    width: 200,
    padding: '.75rem',
    ':hover': { background: theme.colors.background.blue },
  },
  '.delete-button': {
    color: theme.colors.red[300],
  },
}));

/**
 * @type {(props: {
 * row: any
 * }) => JSX.Element}
 */
const EventTableRow = ({ row, selected, onSelected }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const iconRef = useRef();
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(iconRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledTableRow className={selected ? 'selected' : ''}>
      <TableCell align="left">
        <Checkbox
          checked={selected}
          onChange={(e) => {
            onSelected?.(e, row);
          }}
        />
      </TableCell>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="left">{row.dates}</TableCell>
      <TableCell align="left">{row.last_updated}</TableCell>
      <TableCell align="left">
        <span className={`status status--${row.status.toLowerCase()}`}>{row.status}</span>
      </TableCell>
      <TableCell padding="checkbox">
        <Button
          variant="text"
          sx={({ colors }) => ({ color: colors.gray[500] })}
          onClick={handleClick}
        >
          <MoreVert ref={iconRef} />
        </Button>
        <StyledMenu
          className="menu"
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Unpublish</MenuItem>
          <MenuItem onClick={handleClose} className={`delete-button`}>
            Delete
          </MenuItem>
        </StyledMenu>
      </TableCell>
    </StyledTableRow>
  );
};

// Performace optimization
export default React.memo(EventTableRow, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected && compare(prevProps.row, nextProps.row);
});
