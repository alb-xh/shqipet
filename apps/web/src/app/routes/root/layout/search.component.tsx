import SearchIcon from '@mui/icons-material/Search';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from '@mui/joy/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

import { useAlerts, useAppContext } from '../../../common';
import { useState } from 'react';

export const Search = () => {
  const { warningAlert } = useAlerts();
  const { searchValue, searchOptions, setSearchValue, } = useAppContext();

  const { isSearching } = searchValue;
  const { show, categories } = searchOptions;

  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('Search');
  const [searchedAt, setSearchedAt] = useState(null);
  const [category, setCategory] = useState('');

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    if (!value) {
      return;
    }

    if (searchedAt && (Date.now() - searchedAt) < 2000) {
      warningAlert('Please slow down :)');

      return;
    }

    setSearchedAt(Date.now());
    setPlaceholder(`Results for ${value}`);
    setSearchValue({ category, value, isSearching: true });

    e.preventDefault();
  };

  const handleDropdownChange = (e) => {
    setCategory(e.target.value);
    setValue('');
    setSearchValue({ category: e.target.value, value: '', isSearching: true });
  };

  const handleCancel = () => {
    setCategory('');
    setValue('');
    setPlaceholder('Search');

  }

  return (
    <Box
      display='flex'
      width="auto"
      maxWidth={500}
      bgcolor='#5c5e63'
      padding={0.8}
      borderRadius={2}
    >
      <Box
        display={'flex'}
        marginX={1}
        alignItems={'center'}
      >
        <SearchIcon/>
      </Box>
      {
        categories.length > 0 && (
          <FormControl
            disabled={isSearching}
            size='small'
            sx={{
              minWidth: 120,
              marginX: 1,
              bgcolor: '#747e87',
              color: 'white'
            }}
            variant='filled'
            focused={false}
          >
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={handleDropdownChange}
              label='Category'
            >
              {
                categories.map((category, index) => (
                  <MenuItem key={index} value={category}>{category}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        )
      }
      <Input
        disabled={isSearching || !category}
        sx={{
          border: 'none',
          backgroundColor: '#161414',
          color: 'white',
          borderRadius: 10,
        }}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {
        isSearching && (
          <Box display={'flex'} alignItems={'center'} marginX={1}>
            <CircularProgress size={25} />
          </Box>
        )
      }
      {
        (!isSearching && (category || value)) && (
          <IconButton onClick={handleCancel}>
            <CancelIcon />
          </IconButton>
        )
      }
    </Box>
  )
}