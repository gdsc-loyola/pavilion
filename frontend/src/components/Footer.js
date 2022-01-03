import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { theme } from '$lib/theme';
import logo from '../../static/assets/pav_footer_logo.svg';
import { styled } from '@mui/material';

const StyledFooter = styled('footer')(() => ({
  backgroundColor: '#F8F9FF',
  maxWidth: '100vw',
  padding: '40px 10%',
}));

const linkStyles = {
  textDecoration: 'none',
};

const { breakpoints, typography, colors, fontSize } = theme;

const Footer = () => {
  return (
    <StyledFooter>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '66px',
          [breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          },
        }}
      >
        <Box
          component="div"
          maxWidth="270px"
          sx={{
            [breakpoints.down('md')]: {
              marginBottom: '20px',
            },
          }}
        >
          <Box
            sx={{
              [breakpoints.down('md')]: {
                textAlign: 'center',
              },
            }}
          >
            <img src={logo} alt="" />
          </Box>
          <Typography
            component="p"
            color={colors.gray[500]}
            fontSize={fontSize.sm}
            marginTop="16px"
            sx={{
              [breakpoints.down('md')]: {
                textAlign: 'center',
              },
            }}
          >
            The all-in-one organization platform for university students.
          </Typography>
        </Box>

        <Box component="div" display="flex" flexDirection="column" margin="auto 0">
          <Link style={linkStyles} to="/">
            <Typography
              paddingBottom="24px"
              fontSize={typography.fontSize.sm}
              color={colors.gray[500]}
              sx={{
                [theme.breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              Home
            </Typography>
          </Link>
          <Link style={linkStyles} to="/organizations">
            <Typography
              paddingBottom="24px"
              fontSize={fontSize.sm}
              color={colors.gray[500]}
              sx={{
                [theme.breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              Organizations
            </Typography>
          </Link>
          <Link style={linkStyles} to="/admin">
            <Typography
              paddingBottom="24px"
              fontSize={fontSize.sm}
              color={colors.gray[500]}
              sx={{
                [breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              Admins Log In
            </Typography>
          </Link>
        </Box>
      </Box>
      <Typography
        component="p"
        color={colors.gray[400]}
        fontSize={fontSize.xs}
        sx={{
          [breakpoints.down('md')]: {
            textAlign: 'center',
          },
        }}
      >
        Passionately made by Google Developer Student Clubs - Loyola
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
