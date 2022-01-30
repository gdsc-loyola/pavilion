import { theme } from '$lib/theme';
import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import React, { useState } from 'react';

/**
 * @type {(props: {
 * onChange:  React.ChangeEventHandler<HTMLInputElement>,
 * value: string,
 * placeholder?: string,
 * label?: string,
 * size?: 'medium' | 'small'
 * sx?: import('@mui/material').SxProps<import('@mui/material').Theme>
 * }) => JSX.Element}
 */
const Searchbar = ({ onChange, value, label, placeholder, size = 'small', sx }) => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <Search
        sx={{
          position: 'absolute',
          top: `calc(50% + ${size === 'medium' ? '1px' : '2px'})`,
          transform: `translateY(-50%)`,
          left: '14px',
        }}
        style={{
          color: theme.colors.gray[400],
        }}
      />
      <TextField
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setSearchFocus(false)}
        placeholder={searchFocus ? placeholder : ''}
        label={searchFocus || value ? '' : label}
        variant="outlined"
        value={value}
        size={size}
        onChange={onChange}
        sx={{
          flex: 1,
          margin: 0,
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
          ...sx,
        }}
        InputProps={{
          sx: {
            paddingLeft: '36px',
            fontSize: theme.fontSize.sm,
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.typography.fontSize.xs,
            },
            input: {
              padding: size === 'medium' ? '12.5px 14px' : undefined,
            },
          },
        }}
        InputLabelProps={{
          shrink: false,

          sx: {
            paddingLeft: searchFocus || value ? 0 : '36px',
            fontSize: theme.fontSize.sm,
            [theme.breakpoints.down('sm')]: {
              fontSize: theme.fontSize.xs,
            },
            transform: size === 'medium' ? `translate(14px, 13px)` : undefined,
          },
        }}
      />
    </div>
  );
};

export default Searchbar;
