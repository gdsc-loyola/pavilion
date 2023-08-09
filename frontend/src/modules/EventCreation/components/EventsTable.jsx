import React, { useCallback, useState } from 'react';
import EmptyState from '../../../modules/OrgCatalogue/components/EmptyState';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Checkbox, Button, TableSortLabel, useMediaQuery } from '@mui/material';
import * as dayjs from 'dayjs';
import Modal from './Modal';
import { Delete } from '@mui/icons-material';
import { defaultComparator } from '../utils/sorting';
import EventTableRow from './EventTableRow';
import { styled } from '@mui/material';
import { useEventsStore } from '../stores/useEventsStore';
import { colors } from '$lib/theme';
import http from '$lib/http';
import { useAdminUser } from '$lib/context/AdminContext';
import { useBoolean } from '$lib/utils/useBoolean';
import { Typography } from '@mui/material';

const StyledTable = styled(Table)(() => ({
  'td, th': {
    border: 0,
    padding: '1rem',
    '&:first-of-type': {
      paddingLeft: '2rem',
    },
  },
  th: {
    padding: '1.25rem',
  },
}));
const createRow = (event) => {
  const startDate = dayjs(event.start_date).format('MMM DD, YYYY');
  const endDate = dayjs(event.end_date).format('MMM DD, YYYY');
  const lastUpdated = dayjs(event.last_updated).format('MMM DD, YYYY');
  return {
    ...event,
    name: event.name,
    dates: `${startDate} - ${endDate}`,
    last_updated: lastUpdated,
    status: event.status,
  };
};

const dateIds = ['start_date', 'last_updated'];
function descendingComparator(a, b, orderBy) {
  if (dateIds.includes(orderBy)) {
    const aTime = new Date(a[orderBy]).getTime();
    const bTime = new Date(b[orderBy]).getTime();

    // If a is later than b, then a should come after b.
    if (bTime < aTime) {
      return -1;
    }

    // If a is earlier than b, then a should come before b.
    if (bTime > aTime) {
      return 1;
    }

    return 0;
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  if (order === '') {
    return (a, b) => defaultComparator(a, b);
  }
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Event Name',
  },

  {
    id: 'start_date',
    numeric: false,
    label: 'Event Dates',
  },
  {
    id: 'last_updated',
    numeric: false,
    label: 'Last updated on',
  },
  {
    id: 'status',
    numeric: false,
    label: 'Status',
  },
];
/**
 * @type {(props: {
 * data: Array<import('$services/events.service').Event>
 * }) => JSX.Element}
 */
const EventsTable = ({ data }) => {
  const sortedData = data.sort(defaultComparator);
  const rows = sortedData.map(createRow);
  const { setSelectedEvents, selectedEvents, setEvents, events } = useEventsStore();
  const { accessToken, refetchOrg } = useAdminUser();
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBoolean();

  const onSelectRow = useCallback(
    (e, row) => {
      setSelectedEvents(e.currentTarget.checked ? 'add' : 'remove', row.id);
    },
    [setSelectedEvents]
  );

  const deleteEvent = async (id) => {
    // Optimistic UI update
    setEvents(events.filter((e) => e.id !== id));
    setSelectedEvents('removeAll');

    const res = await http.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    refetchOrg();
    return res;
  };

  const deleteSelected = async () => {
    setEvents(events.filter((e) => !selectedEvents.includes(e.id)));
    setSelectedEvents('removeAll');
    closeModal();

    selectedEvents.map(async (id) => {
      await http.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    refetchOrg();
  };

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isAsc ? 'desc' : isDesc ? '' : 'asc');
    setOrderBy(isDesc ? '' : property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const isSelecting = selectedEvents.length > 0;
  const selectedEventsCount = selectedEvents.length;
  return (
    <TableContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '14px',
          pl: 4,
          pb: 1,
          '& hr': {
            ml: 3,
            mr: 1,
          },
        }}
      >
        {isSelecting ? (
          <>
            <Box>
              <Checkbox
                key="a"
                sx={{ pr: 2 }}
                checked={selectedEventsCount >= rows.length}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setSelectedEvents(
                      'addMany',
                      rows.map((r) => r.id)
                    );
                  } else {
                    setSelectedEvents('removeAll');
                  }
                }}
              />
              {selectedEventsCount} of {rows.length} events
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button
              size="small"
              variant="blank"
              sx={{ display: 'flex', alignItems: 'center' }}
              onClick={openModal}
            >
              <Delete
                sx={{ color: colors.gray['400'], width: '20px', height: '20px', mb: 0.3, mr: 0.5 }}
              />
              <span>Delete</span>
            </Button>
          </>
        ) : (
          <>
            <Box>
              <Checkbox
                key="b"
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setSelectedEvents(
                      'addMany',
                      rows.map((r) => r.id)
                    );
                  } else {
                    setSelectedEvents('removeAll');
                  }
                }}
              />
              Select All Events
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
          </>
        )}
      </Box>
      <StyledTable sx={{ minWidth: 900 }} aria-label="simple table" padding="normal">
        <TableHead>
          <TableRow
            sx={({ colors }) => ({
              backgroundColor: colors.gray[100],
              th: {
                border: 0,
                color: colors.gray[500],
              },
            })}
          >
            <TableCell align="center" padding="checkbox"></TableCell>
            {headCells.map((headCell) => {
              return (
                <TableCell align="left" key={headCell.id} padding={headCell.padding || 'normal'}>
                  <TableSortLabel
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                    active={orderBy === headCell.id}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              );
            })}
            <TableCell align="center" padding="checkbox"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.sort(getComparator(order, orderBy)).map((row) => (
            <EventTableRow
              row={row}
              key={row.id}
              onDelete={deleteEvent}
              selected={selectedEvents.includes(row.id)}
              onSelected={onSelectRow}
            />
          ))}
        </TableBody>
        {rows.length == 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              alignItems: 'center',
              pt: 4,
              pl: 4,
              pr: 4,
            }}
          >
            <EmptyState style={{ margin: '0 auto' }} width={320} />
            <Typography variant="h6" align="center">
              We can't seem to find what you were looking for...
            </Typography>
          </Box>
        ) : (
          <p></p>
        )}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          isDanger
          withTextField={false}
          title={`Delete ${selectedEventsCount} Event${selectedEventsCount > 1 ? 's' : ''}`}
          subtitle="This will delete all the information you’ve added so far."
          leftButtonProps={{
            label: 'Never Mind',
            onClick: closeModal,
          }}
          rightButtonProps={{
            label: 'Delete Events',
            onClick: deleteSelected,
          }}
        />
      </StyledTable>
    </TableContainer>
  );
};

export default EventsTable;
