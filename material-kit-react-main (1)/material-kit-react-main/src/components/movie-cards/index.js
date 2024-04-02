import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';

function MovieCard({image, ratingValue}) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        alt="mamma mia"
        height="300"
        image={image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mamma mia (2008)
        </Typography>
        <Rating name="disabled" value={ratingValue} disabled />
      </CardContent>
    </Card>
  );
}

export default MovieCard;
