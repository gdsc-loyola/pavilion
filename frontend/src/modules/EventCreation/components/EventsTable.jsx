import React, { useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Checkbox } from '@mui/material';
import * as dayjs from 'dayjs';
import { defaultComparator } from '../utils/sorting';
import EventTableRow from './EventTableRow';
import { styled } from '@mui/material';
import { useEventsStore } from '../stores/useEventsStore';

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
/**
 * @type {(props: {
 * data: Array<import('$services/events.service').Event>
 * }) => JSX.Element}
 */
const EventsTable = ({ data }) => {
  const sortedData = data.sort(defaultComparator);
  const rows = sortedData.map(createRow);
  const { setSelectedEvents, selectedEvents } = useEventsStore();

  const onSelectRow = useCallback(
    (e, row) => {
      setSelectedEvents(e.currentTarget.checked ? 'add' : 'remove', row.id);
    },
    [setSelectedEvents]
  );

  const isSelecting = selectedEvents.length > 0;

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
            mx: 3,
          },
        }}
      >
        {isSelecting ? (
          <>
            <Box>
              <Checkbox
                key="a"
                sx={{ pr: 2 }}
                checked={selectedEvents.length >= rows.length}
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
              {selectedEvents.length} of {rows.length} events
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
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
            <TableCell align="left">Event Name</TableCell>
            <TableCell align="left">Event Dates</TableCell>
            <TableCell align="left">Last updated on</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center" padding="checkbox"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <EventTableRow
              row={row}
              key={row.id}
              selected={selectedEvents.includes(row.id)}
              onSelected={onSelectRow}
            />
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default EventsTable;
