import { styled, Menu, Button, Avatar as A, Grid, MenuItem } from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import orgLogo from '$static/assets/gdsc_logo.svg';
import React from 'react';

const Container = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.gray[300]}`,
  height: '80px',
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRaidus: 6,
    border: `1px solid ${theme.colors.gray[300]}`,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
  },
}));

const AvatarContainer = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.01)',
  },
}));

const Avatar = styled(A)();

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    history.push('/login');
  };

  const open = Boolean(anchorEl);
  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: '100%', padding: '0 1rem' }}
      >
        <Grid item>hi</Grid>
        <Grid item>
          <AvatarContainer
            variant=""
            onClick={handleClick}
            endIcon={<KeyboardArrowDown sx={{ width: '18px', color: '#9CA3AF' }} />}
          >
            <Avatar
              alt="Remy Sharp"
              src={orgLogo}
              sx={{ border: '1px solid #D1D5DB', height: '52px', width: '52px' }}
            />
          </AvatarContainer>

          <StyledMenu
            id="basic-menu"
            elevation={0}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                logOut();
              }}
            >
              Log Out
            </MenuItem>
          </StyledMenu>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TopBar;
