import React from 'react';
import { useHistory } from 'react-router';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  createTheme,
  styled,
} from '@mui/material';
import { colors, typography } from '$lib/theme';

/**
 * @description A MUI Card dedicated for events
 * @param {Omit<ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */

const getStatus = (startDate, endDate, status) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const start = new Date(startDate).getTime();

  if (status === 'Draft') {
    return 'Draft';
  }
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

const EventCard = (props) => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 425,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const StyledTag = styled('span')(({ theme }) => ({
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
      //used to be yellow
      background: theme.colors.green[200],
      color: theme.colors.green[500],
    },
    '.status--completed': {
      //used to be green
      background: theme.colors.blue[200],
      color: theme.colors.blue[500],
    },
  }));

  const { imgSrc, alt, eventName, startDate, endDate, logoSrc, logoName, eventId, eventStatus } =
    props;
  const history = useHistory();

  let formattedStartDate = new Date(startDate).toDateString();
  let formattedStartDateArray = formattedStartDate
    .substr(formattedStartDate.indexOf(' ') + 1)
    .split(' ');
  formattedStartDate =
    formattedStartDateArray[0] +
    ' ' +
    formattedStartDateArray[1] +
    ', ' +
    formattedStartDateArray[2];
  let formattedEndDate = new Date(endDate).toDateString();
  let formattedEndDateArray = formattedEndDate.substr(formattedEndDate.indexOf(' ') + 1).split(' ');
  formattedEndDate =
    formattedEndDateArray[0] + ' ' + formattedEndDateArray[1] + ', ' + formattedEndDateArray[2];

  let formattedStatus = getStatus(startDate, endDate, eventStatus);
  return (
    <Card sx={{ width: '100%', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)' }}>
      <CardActionArea
        onClick={() => history.push(`/organizations/${logoName.toLowerCase()}/${eventId}`)}
      >
        <CardMedia component="img" height="92" image={imgSrc} alt={alt} />
        <CardContent sx={{ paddingBottom: '0', marginBottom: '0' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              marginBottom: '8px',
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              [theme.breakpoints.down('sm')]: {
                fontSize: typography.fontSize.base,
              },
            }}
            color={colors.gray[700]}
            component="p"
          >
            {eventName}
          </Typography>
          <Typography
            sx={{
              fontWeight: typography.fontWeight.reg,
              fontSize: '16px',
              [theme.breakpoints.down('sm')]: {
                fontSize: typography.fontSize.sm,
              },
            }}
            color={colors.gray[700]}
            variant="body2"
          >
            {formattedStartDate} - {formattedEndDate}
          </Typography>
        </CardContent>
        <CardContent>
          <StyledTag>
            <span className={`status status--${formattedStatus.toLowerCase()}`}>
              {formattedStatus}
            </span>
          </StyledTag>
        </CardContent>
        <CardHeader
          sx={{ paddingTop: '0' }}
          avatar={<Avatar sx={{ width: 24, height: 24 }} src={logoSrc} aria-label="logo" />}
          title={logoName}
          titleTypographyProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              fontSize: '14px',
              color: colors.gray[500],
              [theme.breakpoints.down('sm')]: {
                fontSize: typography.fontSize.xs,
              },
            },
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
