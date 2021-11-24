import React from "react";
import { Card, Box, Typography, Avatar, createTheme, IconButton } from "@mui/material";
import { colors, typography } from "$lib/theme";
import { styled } from "@mui/material/styles";
import { icons } from "$components/icons";
const SocialButton = styled(IconButton)(({ theme }) => ({
  marginRight: "16px",
  padding: "0",
  "&:hover": { fill: theme.colors.blue[400], backgroundColor: "#FFF" },
  fill: theme.colors.gray[500],
}));

const OrgTitleCard = (props) => {
  const { orgBody, logoSrc, orgName, shortOrgName } = props;
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
          height: "fit-content",
          flexGrow: "0",
          padding: "4px 8px",
          borderRadius: "4px",
          [theme.breakpoints.down("md")]: {
            alignSelf: "flex-start",
            justifySelf: "flex-start",
            marginBottom: "8px",
          },
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
    <Card sx={{ padding: "24px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
          },
        }}
      >
        <Avatar
          sx={{
            width: 172,
            height: 172,
            marginRight: "24px",
            [theme.breakpoints.down("md")]: {
              height: "72px",
              width: "72px",
            },
          }}
          src={logoSrc}
          aria-label="logo"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              [theme.breakpoints.down("md")]: {
                flexDirection: "column-reverse",
                alignSelf: "flex-start",
                justifySelf: "flex-start",
              },
            }}
          >
            <Typography
              color={colors.gray[700]}
              sx={{
                marginRight: "16px",
                fontWeight: typography.fontWeight.med,
                fontSize: typography.fontSize.lg,
                [theme.breakpoints.down("md")]: {
                  fontSize: typography.fontSize.md,
                },
              }}
            >
              {orgName}
            </Typography>
            <OrgBodyTag body={orgBody} />
          </Box>
          <Typography
            color={colors.gray[700]}
            sx={{
              marginTop: "8px",
              fontWeight: typography.fontWeight.reg,
              fontSize: typography.fontSize.base,
            }}
          >
            {shortOrgName}
          </Typography>
          <Box sx={{ marginTop: "16px", display: "flex", flexDirection: "row" }}>
            <SocialButton>{icons.website}</SocialButton>
            <SocialButton>{icons.facebook}</SocialButton>
            <SocialButton>{icons.instagram}</SocialButton>
            <SocialButton>{icons.linkedin}</SocialButton>
            <SocialButton>{icons.twitter}</SocialButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default OrgTitleCard;
