import { Button, TableCell, styled, Checkbox, Popper, ClickAwayListener, Box } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import MUITableRow from '@mui/material/TableRow';
import compare from 'just-compare';
import React, { useRef, useState } from 'react';
import { colors } from '$lib/theme';
import Modal from './Modal';
import { useBoolean } from '$lib/utils/useBoolean';
import { useHistory } from 'react-router-dom';

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
  '.status--upcoming': {
    background: theme.colors.yellow[200],
    color: theme.colors.yellow[500],
  },

  '.status--ongoing': {
    background: theme.colors.yellow[200],
    color: theme.colors.yellow[500],
  },
  '.status--completed': {
    background: theme.colors.green[200],
    color: theme.colors.green[500],
  },
}));

const getStatus = (startDate, endDate) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const start = new Date(startDate).getTime();

  if (start > now) {
    return 'Upcoming';
  }

  if (start <= now && end >= now) {
    return 'Ongoing';
  }

  if (end < now) {
    return 'Completed';
  }
};

/**
 * @type {(props: {
 * row: any
 * }) => JSX.Element}
 */
const EventTableRow = ({ row, selected, onSelected, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();
  const iconRef = useRef();
  const open = Boolean(anchorEl);
  const router = useHistory();

  const handleClick = () => {
    setAnchorEl(iconRef.current);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? `row-${row.id}-popper` : undefined;

  const deleteCurrentEvent = async () => {
    await onDelete(row.id);
  };

  const status = getStatus(row.start_date, row.end_date);
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
        <span className={`status status--${status.toLowerCase()}`}>{status}</span>
      </TableCell>
      <TableCell padding="checkbox">
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Button
              variant="text"
              sx={({ colors }) => ({ color: colors.gray[500] })}
              onClick={handleClick}
            >
              <MoreVert ref={iconRef} />
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end">
              <Box
                sx={(theme) => ({
                  background: 'white',
                  boxShadow: theme.boxShadows['black1'],
                  display: 'flex',
                  flexDirection: 'column',
                  width: '200px',
                  '.MuiButton-root': {
                    color: theme.colors.gray['700'],
                    borderRadius: 0,
                    padding: '.75rem 0',
                  },
                  '.MuiButton-root.danger': {
                    color: colors.red['300'],
                  },
                  '.MuiButton-root:hover': {
                    background: theme.colors.blue['100'],
                  },
                })}
              >
                <Button
                  variant="blank"
                  onClick={() => router.push(`/admin/events/${row.id}/details`)}
                >
                  Edit
                </Button>

                <Button
                  variant="blank"
                  className="danger"
                  onClick={() => {
                    openModal();
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Popper>
          </div>
        </ClickAwayListener>
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          isDanger
          withTextField={false}
          title="Delete Event"
          subtitle="This will delete all the information you’ve added so far."
          leftButtonProps={{
            label: 'Never Mind',
            onClick: closeModal,
          }}
          rightButtonProps={{
            label: 'Delete Event',
            onClick: deleteCurrentEvent,
          }}
        />
      </TableCell>
    </StyledTableRow>
  );
};

// Performace optimization
export default React.memo(EventTableRow, (prevProps, nextProps) => {
  return prevProps.selected === nextProps.selected && compare(prevProps.row, nextProps.row);
});
