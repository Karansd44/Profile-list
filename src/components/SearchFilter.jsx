import { useState, useEffect } from 'react';
import { useProfiles } from '../context/ProfileContext';
import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchFilter = () => {
  const { filterProfiles } = useProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      filterProfiles(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, filterProfiles]);

  const handleClear = () => {
    setSearchTerm('');
    filterProfiles('');
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search profiles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} />,
          endAdornment: searchTerm && (
            <IconButton onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          ),
          sx: {
            borderRadius: '25px',
            backgroundColor: 'background.paper',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }
          }
        }}
      />
    </Box>
  );
};

export default SearchFilter;