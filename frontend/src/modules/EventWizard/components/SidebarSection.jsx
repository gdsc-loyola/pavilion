import React from 'react';
import { Typography } from '@mui/material';
import { colors, typography } from '$lib/theme';

const SidebarSection = ({ name, children }) => {
  return (
    <div
      style={{
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 0',
        }}
      >
        <div
          style={{
            border: '1px solid #D1D5DB',
            width: '3.25rem',
            height: 0,
          }}
        ></div>
        <Typography
          variant="p"
          fontSize={12}
          color={colors.gray[500]}
          fontWeight={typography.fontWeight.bold}
          sx={{ textTransform: 'uppercase', padding: '0 4px' }}
        >
          {name}
        </Typography>
        <div
          style={{
            border: '1px solid #D1D5DB',
            width: '100%',
            height: 0,
          }}
        ></div>
      </div>
      {children}
    </div>
  );
};

export default SidebarSection;
