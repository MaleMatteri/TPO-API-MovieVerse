import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EmptyListCard() {
  return (
    <Card sx={{ minWidth: 200, maxWidth: 300}} className='empty-list-card'>
      <CardContent>
        <Typography variant="subtitle1" color="text.secondary">
          Add your first movie to this list!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can do it by choosing a list from the dropdown inside the movie card!
        </Typography>
      </CardContent>
    </Card>
  );
}
