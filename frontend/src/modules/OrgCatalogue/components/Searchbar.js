import { theme } from '$lib/theme';
import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import React, { useState } from 'react';

/**
 * @type {(props: {
 *  onChange: (value: string) => void,
 * 	value: string,
 * }) => JSX.Element}
 */
const Searchbar = ({ onChange, value }) => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <>
      <Search
        sx={{
          position: 'absolute',
          top: '16px',
          left: '14px',
        }}
        style={{
          color: theme.colors.gray[400],
        }}
      />
      <TextField
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        placeholder={searchFocus ? 'Search for an organization...' : ''}
        label={searchFocus || value ? 'Search' : 'Search for an organization...'}
        variant="outlined"
        value={value}
        onChange={onChange}
        sx={{
          maxWidth: '33%',
          fontSize: theme.fontSize.sm,
          [theme.breakpoints.down('lg')]: {
            maxWidth: '45%',
          },
          [theme.breakpoints.down(850)]: {
            maxWidth: '70%',
          },
          [theme.breakpoints.down(600)]: {
            maxWidth: '100%',
          },
        }}
        InputProps={{
          sx: {
            paddingLeft: '36px',
            fontSize: theme.fontSize.sm,
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.fontSize.xs,
            },
          },
        }}
        InputLabelProps={{
          sx: {
            paddingLeft: searchFocus || value ? 0 : '36px',
            fontSize: theme.fontSize.sm,
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.fontSize.xs,
            },
          },
        }}
      />
    </>
  );
};

export default Searchbar;
