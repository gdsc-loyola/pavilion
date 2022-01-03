import React, { useEffect, useState } from 'react';

import { FilterAlt } from '@mui/icons-material';
import { Box, Typography, FormControlLabel, Checkbox, Button } from '@mui/material';
import { theme } from '$lib/theme';
import FilterTag from './FilterTag';

const { colors } = theme;

const FILTER_TAGS = [
  {
    tag: 'coa',
    label: 'COA',
  },
  {
    tag: 'lions',
    label: 'LIONS',
  },
  {
    tag: 'sanggu',
    label: 'Sanggu',
  },
];

/**
 * @type {(props: {
 *	filterTags: Array<string>;
 * filters: Array<string>;
 * setFilterTags: Function;
 * setFilters: Function;
 * setFiltersApplied: Function;
 *
 * }) => JSX.Element}
 */
const Filter = ({ filterTags, setFilterTags, filters, setFilters, setFiltersApplied }) => {
  const [openFilter, setOpenFilter] = useState(false);

  const closeFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    window.addEventListener('mousedown', closeFilter);

    return () => {
      window.removeEventListener('mousedown', closeFilter);
      setFiltersApplied(true);
    };
  }, [setFiltersApplied]);

  return (
    <>
      <Box
        component="div"
        sx={{
          display: 'flex',
          marginTop: '16px',
        }}
      >
        <Box
          component="div"
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            backgroundColor: openFilter ? colors.gray[100] : 'transparent',
            borderRadius: '4px',
            width: 'fit-content',
            padding: '4px 8px',
            marginRight: '24px',
            boxSizing: 'border-box',
            transition: 'all 150ms ease-in-out',
            '&:hover': {
              backgroundColor: colors.gray[100],
            },
            [theme.breakpoints.down('sm')]: {
              padding: '1px 6px',
              marginRight: '12px',
            },
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Box
            onClick={() => setOpenFilter(!openFilter)}
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: 'fit-content',
            }}
          >
            <FilterAlt
              sx={{
                color: colors.blue[400],
                [theme.breakpoints.down('sm')]: {
                  width: '16px',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: theme.fontSize.sm,
                color: colors.gray[400],
                [theme.breakpoints.down('sm')]: {
                  fontSize: theme.fontSize.xs,
                },
              }}
            >
              Filter
            </Typography>
          </Box>
          {/* filter list */}
          <Box
            component="div"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: '32px',
              backgroundColor: 'white',
              width: openFilter ? 'max-content' : '81.5px',
              height: openFilter ? 'max-content' : 0,
              transition: 'all 0.15s ease-out',
              zIndex: '1',
              overflow: 'hidden',
              padding: openFilter ? '24px' : 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08), 0px 4px 10px rgba(0, 0, 0, 0.08)',
              [theme.breakpoints.down('sm')]: {
                width: openFilter ? 'calc(100vw - 80px)' : '64.75px',
                boxSizing: 'border-box',
              },
              [theme.breakpoints.down('xs')]: {
                width: openFilter ? 'calc(100vw - 32px)' : '64.75px',
                boxSizing: 'border-box',
              },
            }}
          >
            {FILTER_TAGS.map((item) => (
              <FilterItem
                key={item.tag}
                checked={filters.includes(item.tag)}
                onClick={() => {
                  setFiltersApplied(false);
                  setFilters((prev) =>
                    !prev.includes(item.tag)
                      ? [...prev, item.tag]
                      : prev.filter((x) => x !== item.tag)
                  );
                }}
                label={item.label}
              />
            ))}

            <Button
              onClick={() => setFiltersApplied(true)}
              variant="outlined"
              sx={{
                border: '1px solid #498AF4',
                boxSizing: 'border-box',
                borderRadius: '4px',
                color: colors.blue[300],
                fontSize: theme.fontSize.sm,
                padding: '8px 60px',
                marginTop: '18px',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                  padding: '8px 0',
                },
              }}
            >
              Apply filters
            </Button>
          </Box>
        </Box>
        {filterTags.length > 0 &&
          filterTags.map((tag) => (
            <FilterTag
              key={tag}
              label={tag.toUpperCase()}
              setFilterTags={setFilterTags}
              setFilters={setFilters}
              tag={tag}
            />
          ))}
      </Box>
    </>
  );
};

/**
 *
 * @param {Object} props
 * @param {Function} props.onClick
 * @param {Array} props.checked
 * @param {Function} props.setFilterTags
 * @param {String} props.label
 * @returns
 */
function FilterItem({ onClick, checked, label }) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          onClick={onClick}
          checked={checked}
          sx={{
            color: colors.gray[400],
            '&.Mui-checked': {
              color: colors.green[400],
            },
          }}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: theme.fontSize.sm,
            color: colors.gray[700],
          }}
        >
          {label}
        </Typography>
      }
    />
  );
}

export default Filter;
