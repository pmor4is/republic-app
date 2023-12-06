import React, { useEffect } from 'react';
import './Searchbar.css';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export function Searchbar({ query, setQuery, onSearch }) {
  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div>
      <TextField
        className='SearchBar'
        type='text'
        placeholder='Pesquisar...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className='Searchbar-input'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
