import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useAlerts, useAppContext } from '../../../common';
import { useState } from 'react';

const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const Search = () => {
  const { warningAlert } = useAlerts();
  const { searchValue, searchOptions, setSearchValue } = useAppContext();

  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const [searchedAt, setSearchedAt] = useState(null);

  if (!searchOptions.show) {
    return null;
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (searchedAt && (Date.now() - searchedAt) < 2000) {
      warningAlert('Please slow down :)');

      return;
    }

    setSearchedAt(Date.now());
    setSearchValue({ ...searchValue, value });
    setPlaceholder(value ? `Results for ${value}` : 'Search');
    setValue('');

    e.preventDefault();
  };

  return (
    <SearchDiv>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
    </SearchDiv>
  )
}