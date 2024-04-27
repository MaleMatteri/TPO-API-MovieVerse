import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectVariants = ({ value, onChange, movie }) => {
  const handleChange = (event) => {
    console.log("Selected value:", event.target.value);
    console.log("Movie:", movie);
    onChange(event.target.value, movie);
  };

  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>List</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        label="List"
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value="watching">Watching</MenuItem>
        <MenuItem value="watched">Watched</MenuItem>
        <MenuItem value="favorites">Favorites</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectVariants;
