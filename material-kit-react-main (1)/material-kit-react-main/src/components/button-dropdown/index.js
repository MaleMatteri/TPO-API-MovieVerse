import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const SelectVariants = ({ value, onMoveMovieToList, listNames, onAddMovieToList }) => {
  const handleChange = (event) => {
    const selectedList = event.target.value;
    onMoveMovieToList(selectedList); // Llama a la función para mover la película a la lista seleccionada
    onAddMovieToList(selectedList); // Llama a la función para agregar la película a la lista
  };

  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>List</InputLabel>
      <Select value={value} onChange={handleChange} label="List">
        <MenuItem value="none">
          <em>None</em>
        </MenuItem>
        {listNames.map((listName) => (
          <MenuItem key={listName} value={listName}>
            {listName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectVariants;
