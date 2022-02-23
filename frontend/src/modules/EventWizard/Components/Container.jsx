import React from 'react';
import { styled } from '@material-ui/core';

const Container = ({ children }) => {
  const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 3rem',
    flex: 1,
    '.MuiButton-root': {
      fontWeight: theme.fontWeight.med,
    },
    'MuiContainer-root': {
      maxWidth: '100%',
      paddingLeft: '68px !important',
      paddingRight: '68px !important',
    },
    h1: {
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.bold,
    },
    position: 'relative',
  }));

  return <Container>{children}</Container>;
};

export default Container;
