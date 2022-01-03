import { useState } from 'react';

export const useSearch = (initialValue) => {
  const [searchValue, setSearchValue] = useState(initialValue || '');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    searchValue,
    handleSearchChange,
  };
};
