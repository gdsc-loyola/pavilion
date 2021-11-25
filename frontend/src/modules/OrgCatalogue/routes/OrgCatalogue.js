import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, Input, InputAdornment, Grid } from '@mui/material'
import { SearchIcon, AccountCircle, Search } from '@mui/icons-material'

import { theme, colors, typography } from '$lib/theme'
import Layout from '../../StudentLanding/components/Layout'
import OrgCard from '../../../components/OrgCard'
import orgsService from '../../../services/orgs.service'

const OrgCatalogue = () => {
  const [orgs, setOrgs] = useState([])
  const [events, setEvents] = useState([])
  useEffect(() => {
    orgsService.getEvents().then(response => {
      console.log(response)
      setEvents(response.data)
    })
    orgsService.getAll().then(response => {
      console.log(response)
      setOrgs(response.data)
    })
  }, [])

  const [search, setSearch] = useState('')
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const searchKey = params.get('search')
    if (searchKey) {
      setSearch(searchKey)
    }
  }, [])

  const [searchFocus, setSearchFocus] = useState(false)
  useEffect(() => {
    console.log('searchFocus', searchFocus)
  }, [searchFocus])

  const SearchIcon = ({ style }) => {
    return (
      <svg style={style} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#9CA3AF"/>
      </svg>
    )
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Layout>
      <Box
        sx={{
          padding: '160px 144px',
        }}
      >
        <Typography component="h1"
          sx={{
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.xl,
            color: colors.gray[700],
          }}
        >
          Organizations
        </Typography>

        {/* search bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <TextField
            onFocus={() => setSearchFocus(true)}  
            onBlur={() => setSearchFocus(false)}
            placeholder="Search for an organization..." 
            label={searchFocus || search ? 'Search' : 'Search for an organization...'}
            variant="outlined"  
            value={search}  
            onChange={handleSearchChange}
          />
        </Box>

        <Grid container spacing={2} columns={4}>
        { orgs.length > 0 &&
          orgs.map(org => (
            <Grid item xs={4} sm={4} md={2} lg={1}>
              <OrgCard orgPhoto={org.logo} orgBody={org.org_body.toLowerCase()} orgName={org.short_name} />
            </Grid>
          ))
        }
        </Grid>
      </Box>
    </Layout>
  )
}

export default OrgCatalogue
