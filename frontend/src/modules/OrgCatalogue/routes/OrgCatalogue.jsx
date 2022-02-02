import React, { useEffect } from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { theme } from '$lib/theme';
import Layout from '$components/Layout';
import OrgCard from '$components/OrgCard';
import orgsService from '$services/orgs.service';
import { useSearchQuery } from '$lib/utils/useSearchQuery';

// Module specific imports
import Filter from '../components/Filter';
import EmptyState from '../components/EmptyState';
import Searchbar from '$components/Searchbar';

import { useSearch } from '../hooks/useSearch';
import { useFilterOrgs } from '../hooks/useFilterOrgs';
import { useAsync } from '$lib/utils/useAsync';

const { colors, fontSize, fontWeight } = theme;

const OrgCatalogue = () => {
  const smVW = useMediaQuery(theme.breakpoints.down('sm'));
  const query = useSearchQuery();

  const { data, status } = useAsync(orgsService.getAll);
  const orgs = data?.data;

  const { handleSearchChange, searchValue } = useSearch(query.get('search'));

  const {
    filteredOrgs,
    filterTags,
    setFilterTags,
    filters,
    setFilters,
    filtersApplied,
    setFiltersApplied,
  } = useFilterOrgs(orgs, searchValue);

  useEffect(() => {
    if (filtersApplied) {
      setFilterTags(filters);
    }
  }, [filters, filtersApplied, setFilterTags]);

  return (
    <Layout>
      <Box
        sx={{
          padding: '160px 144px 100px',
          overflow: 'hidden',
          [theme.breakpoints.down('md')]: {
            padding: '140px 100px 60px',
          },
          [theme.breakpoints.down('sm')]: {
            padding: '110px 40px 54px',
          },
          [theme.breakpoints.down('xs')]: {
            padding: '110px 16px 48px',
          },
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontWeight: theme.fontWeight.bold,
            fontSize: theme.fontSize.xl,
            color: colors.gray[700],
            [theme.breakpoints.down('md')]: {
              fontSize: fontSize.lg,
              marginBottom: '20px',
            },
            [theme.breakpoints.down('sm')]: {
              fontSize: fontSize.base,
              marginBottom: '16px',
            },
          }}
        >
          Organizations
        </Typography>

        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            marginBottom: '40px',
            [theme.breakpoints.down('sm')]: {
              padding: '2px 0',
              marginBottom: '20px',
            },
          }}
        >
          <Searchbar
            sx={{
              margin: '8px 4px',
              maxWidth: '33%s',
            }}
            size="small"
            label="Search for an organization..."
            placeholder="Search for an organization..."
            onChange={handleSearchChange}
            value={searchValue}
          />

          {/* filter button */}
          <Filter
            filterTags={filterTags}
            filters={filters}
            setFilterTags={setFilterTags}
            setFilters={setFilters}
            setFiltersApplied={setFiltersApplied}
          />
        </Box>

        {status === 'idle' || status === 'pending' ? null : orgs?.length > 0 ? (
          <Grid container spacing={2} columns={4}>
            {filteredOrgs.map((org) => (
              <Grid item xs={4} sm={4} md={2} lg={1} key={org.id}>
                <OrgCard
                  orgPhoto={org.logo}
                  orgBody={org.org_body.toLowerCase()}
                  orgName={org.short_name}
                  orgSlug={org.slug}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            component="div"
            sx={{
              backgroundColor: '#F8F9FF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '40px 0',
            }}
          >
            <EmptyState style={{ margin: '0 auto' }} width={smVW ? '320' : '370'} />
            <Typography
              sx={{
                fontWeight: fontWeight.med,
                fontSize: fontSize.md,
                textAlign: 'center',
                marginTop: '24px',
                margin: '0 40px',
                [theme.breakpoints.down('sm')]: {
                  fontSize: fontSize.base,
                },
              }}
            >
              We can&apos;t seem to find what you’re looking for...
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default OrgCatalogue;
