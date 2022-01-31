import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors, typography } from '$lib/theme';
import EventCard from '$components/EventCard';

/**
 * @type {(props: {
 * orgShortName: string,
 * orgLogo: string,
 * events: Array<any>
 * }) => JSX.Element}
 */
const OtherEvents = ({ orgLogo, orgShortName, events }) => {
  return (
    <>
      <Typography
        color={colors.gray[700]}
        fontSize={typography.fontSize.lg}
        fontWeight={typography.fontWeight.med}
      >
        Other events by {orgShortName}
      </Typography>
      <Box
        sx={({ breakpoints }) => ({
          display: 'grid',
          width: '100%',
          paddingBottom: '5rem',
          paddingTop: '2rem',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          [breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(1, 1fr)',
          },
        })}
      >
        {events.map((event) => {
          return (
            <EventCard
              key={event.id}
              imgSrc={event.cover_photo}
              alt=""
              eventId={event.id}
              eventName={event.name}
              startDate={event.start_date}
              endDate={event.end_date}
              logoSrc={orgLogo}
              logoName={orgShortName}
            />
          );
        })}
      </Box>
    </>
  );
};

export default OtherEvents;
