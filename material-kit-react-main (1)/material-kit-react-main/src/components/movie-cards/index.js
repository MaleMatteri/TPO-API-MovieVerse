import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';


function MovieCard({title, image, ratingValue}) {
  console.log('Image:', image); 
  return (
    <Card sx={{maxWidth: 350, height: '100%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt="mamma mia"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
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
