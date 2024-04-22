import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SelectVariants() {
  const [list, setList] = useState('');

  const handleChange = (event) => setList(event.target.value);

  return (
    <FormControl variant="outlined" sx={{ m: 1, minWidth: 120}}>
      <InputLabel>List</InputLabel>
      <Select
        value={list}
        onChange={handleChange}
        label="List"
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value={10}>Watched</MenuItem>
        <MenuItem value={20}>Watching</MenuItem>
        <MenuItem value={30}>My favourites</MenuItem>
        <MenuItem value={40}>Wish list</MenuItem>
      </Select>
    </FormControl>
  );
}
