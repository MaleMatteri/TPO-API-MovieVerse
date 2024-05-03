import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import SelectVariants from 'src/components/button-dropdown/index.js';
import 'src/components/movie-cards/index.css'; 

function MovieCard({ title, image, ratingValue, movieId, onAddToList }) {
  const [selectedList, setSelectedList] = useState(''); // Define selectedList state

  const handleListChange = (event) => {
    setSelectedList(event.target.value);
    const movie = { id: movieId, value: event.target.value, title, image, ratingValue }; // Include 'value' property
    onAddToList(event.target.value, movie); // Pass movie details
  };

  return (
    <Card sx={{ maxWidth: 250, height: 500 }} className='card-container'>
      <CardMedia
        component="img"
        height="250"
        image={image}
        alt="Pic"
      />
      <CardContent style={{ padding: 15 }} className="card-content">
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Here we should add the main cast
        </Typography>
      </CardContent>
      <CardContent style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 15 }}>
        <Rating name="disabled" value={ratingValue} disabled size="small" />
      </CardContent>
      <div className="bottom-element">
        <CardActions>
          <SelectVariants value={selectedList} onChange={handleListChange} movie={{ id: movieId }} setSelectedList={setSelectedList} />
        </CardActions>
      </div>
    </Card>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  ratingValue: PropTypes.number.isRequired,
  movieId: PropTypes.number.isRequired,
  onAddToList: PropTypes.func.isRequired,
};

export default MovieCard;
