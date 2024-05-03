// SelectVariants.js
import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectVariants = ({ value, onMoveMovieToList }) => {
  const handleChange = (event) => {
    onMoveMovieToList(event.target.value); // Llama a la función onMoveMovieToList con el valor seleccionado
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
