import React from 'react';
import { theme } from '$lib/theme';
import { styled } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';

const colorMap = {
  coa: {
    bg: theme.colors.red[100],
    text: theme.colors.red[400],
  },
  lions: {
    bg: theme.colors.yellow[100],
    text: theme.colors.yellow[500],
  },
  sanggu: {
    bg: theme.colors.blue[100],
    text: theme.colors.blue[400],
  },
};

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'tag',
})(({ tag }) => ({
  backgroundColor: colorMap[tag]['bg'],
  width: 'fit-content',
  padding: '0 8px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  marginRight: '8px',
  boxSizing: 'border-box',
  [theme.breakpoints.down('sm')]: {
    padding: '0 6px',
  },
}));

const Label = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'tag',
})(({ tag }) => ({
  color: colorMap[tag]['text'],
  fontSize: theme.fontSize.xs,
  [theme.breakpoints.down('sm')]: {
    fontSize: '8px',
  },
}));

/**
 * @type {(props: {
 *  tag: string,
 * label: string,
 * setFilterTags: Function,
 * setFilters: Function
 *
 * }) => JSX.Element}
 */
const FilterTag = ({ label, tag, setFilters, setFilterTags }) => {
  const smVW = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container tag={tag}>
      <Label tag={tag}>{label}</Label>
      <div
        onClick={() => {
          setFilterTags((prev) => prev.filter((current) => current !== tag));
          setFilters((prev) => prev.filter((current) => current !== tag));
        }}
        style={{
          height: '24.5px',
          marginLeft: smVW ? '8px' : '10px',
        }}
      >
        <Close
          sx={{
            color: colorMap[tag]['text'],
            width: '12px',
            heigth: '12px',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
        />
      </div>
    </Container>
  );
};

export default FilterTag;
