import React, { useEffect, useState } from "react";
import Layout from "$components/Layout";
import EventTitleCard from "../../modules/Event/components/EventTitleCard";
import EventCard from "$components/EventCard";
import { Box, Typography, createTheme, Grid } from "@mui/material";
import { colors, typography } from "$lib/theme";
import { fontSize } from "@mui/system";
const EventPage = () => {
  const [eventForm, setEventForm] = React.useState({
    eventName: "",
    startDate: "",
    endDate: "",
    orgName: "",
    description: "",
    coverPhoto1: "",
    coverPhoto2: "",
    coverPhoto3: "",
    coverPhoto4: "",
  });
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 700,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  return (
    <>
      <Layout>
        <img
          height="360px"
          width="100%"
          style={{ position: "absolute", marginTop: "80px", zIndex: "-1" }}
          src="http://placehold.jp/150x150.png"
        />
        <Box
          sx={{
            paddingTop: "80px",
            margin: "0 144px",
            [theme.breakpoints.between("lg", "xl")]: {
              margin: "0 112px",
            },
            [theme.breakpoints.between("md", "lg")]: {
              margin: "0 80px",
            },
            [theme.breakpoints.between("sm", "md")]: {
              margin: "0 48px",
            },
            [theme.breakpoints.between("xs", "sm")]: {
              margin: "0 16px",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "760px",
              marginTop: "240px",
              marginBottom: "80px",
            }}
          >
            <EventTitleCard
              eventName="Hackfest"
              startDate="August 2"
              endDate="August 3"
              logoSrc="meg"
              orgName="Googe Developer Student Club"
            />
            <Typography
              sx={{ marginTop: "40px" }}
              color={colors.gray[700]}
              fontWeight={typography.fontWeight.reg}
              fontSize={typography.fontSize.base}
            >
              {eventForm.eventName}
            </Typography>
          </Box>
          <Grid container spacing={2} columns={2} marginBottom="120px">
            <Grid item xs={1} sm={1} md={2} lg={2}>
              <img src="https://via.placeholder.com/150" />
            </Grid>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default EventPage;
