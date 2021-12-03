import React from "react";
import { useHistory } from "react-router";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Avatar,
  createTheme
} from "@mui/material";
import { colors, typography } from "$lib/theme";
/**
 * @description A MUI Card dedicated for events
 * @param {Omit<ControllerProps, 'render'> & React.ComponentPropsWithoutRef<typeof TextField>} props
 * @returns {React.Component}
 */

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
  const { imgSrc, alt, eventName, startDate, endDate, logoSrc, logoName } = props;
  const history = useHistory();

  let formattedStartDate = new Date(startDate).toDateString();
  let formattedStartDateArray = formattedStartDate
    .substr(formattedStartDate.indexOf(" ") + 1)
    .split(" ");
  formattedStartDate =
    formattedStartDateArray[0] +
    " " +
    formattedStartDateArray[1] +
    ", " +
    formattedStartDateArray[2];
  let formattedEndDate = new Date(endDate).toDateString();
  let formattedEndDateArray = formattedEndDate.substr(formattedEndDate.indexOf(" ") + 1).split(" ");
  formattedEndDate =
    formattedEndDateArray[0] + " " + formattedEndDateArray[1] + ", " + formattedEndDateArray[2];

  return (
    <Card sx={{ width: "100%", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)" }}>
      <CardActionArea
        onClick={() => history.push(`/organizations/${logoName.toLowerCase()}/${eventName.toLowerCase()}`)}
      >
        <CardMedia component="img" height="92" image={imgSrc} alt={alt} />
        <CardContent sx={{ paddingBottom: "0", marginBottom: "16px" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              marginBottom: "8px",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              [theme.breakpoints.down("sm")]: {
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
              fontSize: "16px",
              [theme.breakpoints.down("sm")]: {
                fontSize: typography.fontSize.sm,
              },
            }}
            color={colors.gray[700]}
            variant="body2"
          >
            {formattedStartDate} - {formattedEndDate}
          </Typography>
        </CardContent>
        <CardHeader
          sx={{ paddingTop: "0" }}
          avatar={<Avatar sx={{ width: 24, height: 24 }} src={logoSrc} aria-label="logo" />}
          title={logoName}
          titleTypographyProps={{
            sx: {
              fontWeight: typography.fontWeight.reg,
              fontSize: "14px",
              color: colors.gray[500],
              [theme.breakpoints.down("sm")]: {
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
