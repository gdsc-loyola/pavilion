import React from "react";
import { useHistory } from "react-router";
import {
  Box,
  Avatar,
  Typography,
  Card,
  CardActionArea,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { theme, typography, colors } from "$lib/theme";

const OrgCard = ({ orgPhoto, orgBody, orgName, orgId }) => {
  const history = useHistory();

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

  const smVW = useMediaQuery(theme.breakpoints.down(700));

  const OrgBodyTag = ({ body }) => {
    return (
      <Box
        sx={{
          backgroundColor:
            body === "coa"
              ? colors.red[100]
              : body === "lions"
              ? colors.yellow[100]
              : colors.blue[100],
          width: "fit-content",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        <Typography
          color={
            body === "coa"
              ? colors.red[400]
              : body === "lions"
              ? colors.yellow[500]
              : colors.blue[400]
          }
          fontSize={typography.fontSize.xs}
        >
          {body.toUpperCase()}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
        borderRadius: "4px",
      }}
    >
      <CardActionArea
        onClick={() => history.push(`/organizations/${orgId}`)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 0",
          [theme.breakpoints.down("sm")]: {
            padding: "12px 0",
          },
        }}
      >
        <Avatar src={orgPhoto} alt="" sx={{ width: 64, height: 64, mb: smVW ? "12px" : "24px" }} />
        <OrgBodyTag body={orgBody} />
        <Typography
          fontFamily={theme.typography.fontFamily}
          color={colors.gray[700]}
          fontWeight={typography.fontWeight.reg}
          align="center"
          component="p"
          paddingTop="8px"
          sx={{
            fontSize: "20px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        >
          {orgName}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default OrgCard;
