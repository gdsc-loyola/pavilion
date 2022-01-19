import { useEffect, useState } from 'react';

export const useFilterOrgs = (orgs, searchValue) => {
  const [filters, setFilters] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState(orgs || []);

  useEffect(() => {
    setFilteredOrgs(
      orgs
        ?.filter((org) => {
          if (!filterTags || filterTags.length <= 0) {
            return true;
          }
          return filterTags.includes(org.org_body.toLowerCase());
        })
        .filter(
          (org) =>
            org.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            org.short_name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
  }, [filterTags, orgs, searchValue]);

  return {
    filterTags,
    filters,
    filtersApplied,
    filteredOrgs,
    setFilters,
    setFiltersApplied,
    setFilterTags,
    setFilteredOrgs,
  };
};
