import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import mammaMiaImage from 'src/assets/mamma_mia.jpg';


function MovieCard({ratingValue}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={mammaMiaImage}
          alt="mamma mia"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mamma mia (2008)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Rating name="disabled" value={ratingValue} disabled />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MovieCard.propTypes = {
  ratingValue: PropTypes.number.isRequired, // Provide the rating value as a prop
};

export default MovieCard;
