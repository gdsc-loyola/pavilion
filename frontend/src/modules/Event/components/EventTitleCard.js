import React from "react";
import { Box, Typography, Card, Avatar } from "@mui/material";
import { colors, typography } from "$lib/theme";
const EventTitleCard = (props) => {
  const { eventName, startDate, endDate, orgName, logoSrc } = props;
  return (
    <Card sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)" }}>
      <Box
        sx={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          color={colors.gray[700]}
          fontSize={typography.fontSize["2xl"]}
          fontWeight={typography.fontWeight.bold}
          sx={{ marginBottom: "8px" }}
        >
          {eventName}
        </Typography>
        <Typography
          color={colors.gray[500]}
          fontSize={typography.fontSize.md}
          fontWeight={typography.fontWeight.reg}
          sx={{ marginBottom: "24px" }}
        >
          {startDate}-{endDate}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ width: 40, height: 40, marginRight: "8px" }}
            src={logoSrc}
            aria-label="logo"
          />
          <Typography
            color={colors.gray[500]}
            fontSize={typography.fontSize.sm}
            fontWeight={typography.fontWeight.reg}
          >
            {orgName}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default EventTitleCard;
