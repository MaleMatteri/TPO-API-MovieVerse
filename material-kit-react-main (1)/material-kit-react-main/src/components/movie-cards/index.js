import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import SelectVariants from 'src/components/button-dropdown/index.js'
import 'src/components/movie-cards/index.css';


function MovieCard({title, image, ratingValue}) {
  return (
    <Card sx={{maxWidth: 250, height: 500}} className='card-container'>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="Pic"
        />
        <CardContent style={{padding: 15 }} className="card-content">
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here we should add the main cast
        </Typography>
        </CardContent>
        <CardContent style={{paddingTop: 5, paddingBottom:5, paddingLeft:15}}>
        <Rating name="disabled" value={ratingValue} disabled size="small" />
      </CardContent>
      <div className="bottom-element">
        <CardActions>
          <SelectVariants className='DropDown'></SelectVariants>
        </CardActions>
      </div>
    </Card>
  );
}

MovieCard.propTypes = {
  ratingValue: PropTypes.number.isRequired, // Provide the rating value as a prop
};

export default MovieCard;
