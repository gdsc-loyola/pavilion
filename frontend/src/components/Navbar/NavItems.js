import { styled } from '@mui/material/styles';

import React from 'react';
import { theme } from '$lib/theme';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { Button, Box, useMediaQuery } from '@mui/material';

/**
 * @typedef {Array.<{to: string, label: string, preventActiveColor?: boolean}>} NavItemList
 * @description Array of nav items
 */

const StyledLink = styled(Link)(
  ({ theme: { breakpoints, colors }, isActive, preventActiveColor, isNavTransparent }) => ({
    textDecoration: 'none',
    margin: 'auto 0',
    color:
      isActive && !preventActiveColor
        ? colors.blue[300]
        : isNavTransparent
        ? '#FFF'
        : colors.gray[500],
    [breakpoints.down('md')]: {
      color: isActive && !preventActiveColor ? colors.blue[300] : colors.gray[500],
    },
  })
);

const StyledJoinWaitListButton = styled(Button)({
  borderRadius: '4px',
  backgroundColor: 'linear-gradient(90deg, #498AF4 0%, #1A73E8 100%)',
  fontSize: '12px',
  padding: '4px 16px',
  width: 'fit-content',
});
const JoinWaitListButton = () => <StyledJoinWaitListButton>Join Waitlist</StyledJoinWaitListButton>;

/**
 * @type {(props:React.ComponentPropsWithoutRef<typeof StyledLink>
 * & {label: string, isActive: boolean,
 * preventActiveColor: boolean, isNavTransparent: boolean }) => JSX.Element}
 */
const NavItem = ({ label, ...props }) => {
  const { path } = useRouteMatch();
  return (
    <StyledLink {...props} isActive={path === props.to}>
      {label}
    </StyledLink>
  );
};

/**
 * @description Desktop Nav Items
 * @type {(props: {
 * navItems: NavItemList,
 * isNavTransparent: boolean,
 * }) => JSX.Element}
 */
export const NavItemsDesktop = ({ navItems, isNavTransparent }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '48px',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      }}
    >
      {navItems.map((values) => (
        <NavItem {...values} key={values.label} isNavTransparent={isNavTransparent} />
      ))}
      <JoinWaitListButton />
    </Box>
  );
};

/**
 * @description  Mobile Nav Items
 * @type {(props: {
 * navItems: NavItemList,
 * isNavTransparent: boolean,
 * mobileNavOpen: boolean,
 * }) => JSX.Element}
 */
export const NavItemsMobile = ({ navItems, isNavTransparent, mobileNavOpen }) => {
  return (
    <Box
      sx={{
        visibility: mobileNavOpen ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '48px',
        zIndex: '-1',
        position: 'absolute',
        transition: 'all 0.2s ease-in-out',
        top: mobileNavOpen ? '0' : '-150px',
        left: 0,
        width: '100vw',
        padding: '80px 0',
        opacity: mobileNavOpen ? '1' : '0',
      }}
    >
      {navItems.map((values) => (
        <NavItem {...values} key={values.label} isNavTransparent={isNavTransparent} />
      ))}
      <JoinWaitListButton />
    </Box>
  );
};

/**
 * @description Nav Items
 * @type {(props: {
 * navItems: NavItemList,
 * isNavTransparent: boolean,
 * mobileNavOpen: boolean,
 * }) => JSX.Element}
 */
const NavItems = (props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return isMobile ? <NavItemsMobile {...props} /> : <NavItemsDesktop {...props} />;
};
export default NavItems;
