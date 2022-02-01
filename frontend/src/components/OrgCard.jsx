import React from 'react';
import { useHistory } from 'react-router';
import { Box, Avatar, Typography, Card, CardActionArea, useMediaQuery } from '@mui/material';
import { theme } from '$lib/theme';

const { fontSize, fontWeight, colors, breakpoints, typography } = theme;

const OrgCard = ({ orgPhoto, orgBody, orgName, orgSlug }) => {
  const history = useHistory();

  const smVW = useMediaQuery(theme.breakpoints.down(700));

  const OrgBodyTag = ({ body }) => {
    return (
      <Box
        sx={{
          backgroundColor:
            body === 'coa'
              ? colors.red[100]
              : body === 'lions'
              ? colors.yellow[100]
              : colors.blue[100],
          width: 'fit-content',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        <Typography
          color={
            body === 'coa'
              ? colors.red[400]
              : body === 'lions'
              ? colors.yellow[500]
              : colors.blue[400]
          }
          fontSize={fontSize.xs}
        >
          {body.toUpperCase()}
        </Typography>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
        borderRadius: '4px',
      }}
    >
      <CardActionArea
        onClick={() => history.push(`/organizations/${orgSlug}`)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          [breakpoints.down('sm')]: {
            padding: '12px 0',
          },
        }}
      >
        <Avatar src={orgPhoto} alt="" sx={{ width: 64, height: 64, mb: smVW ? '12px' : '24px' }} />
        <OrgBodyTag body={orgBody} />
        <Typography
          fontFamily={typography.fontFamily}
          color={colors.gray[700]}
          fontWeight={fontWeight.reg}
          align="center"
          component="p"
          paddingTop="8px"
          sx={{
            fontSize: '20px',
            [breakpoints.down('sm')]: {
              fontSize: '14px',
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
