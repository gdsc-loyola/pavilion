import React, { useEffect } from "react";
import Layout from "$components/Layout";
import EventTitleCard from "../../modules/EventPage/components/EventTitleCard";
import EventCard from "$components/EventCard";
import { Box, Typography, createTheme } from "@mui/material";
import { colors, typography } from "$lib/theme";
import { fontSize } from "@mui/system";
const EventPage = () => {
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
              EXAMPLE DESCRIPTION
            </Typography>
          </Box>
          <Grid container spacing={2} lg={1} md={2} sm={3} xs={3} marginBottom="120px">
            {orgForm.events.map((event) => (
              <Grid item xs={3} sm={3} md={1} lg={1}></Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default EventPage;
