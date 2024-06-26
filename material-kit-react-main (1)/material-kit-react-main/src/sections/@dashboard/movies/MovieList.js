import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import NewMovieCard from './MovieCard';

// ----------------------------------------------------------------------

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  lists: PropTypes.object.isRequired, 
};

export default function MovieList({ movies, lists, onMoveMovieToList, ...other }) {
  console.log(movies);
  return (
    <Grid container spacing={3} {...other}>
      {movies.map((movie) => (
        <Grid key={movie.id} item xs={12} sm={6} md={3}>
          <NewMovieCard
            movie={movie}
            onMoveMovieToList={onMoveMovieToList} // Pass the onMoveMovieToList prop
            lists={lists}
          />
        </Grid>
      ))}
    </Grid>
  );
}