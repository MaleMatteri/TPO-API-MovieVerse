import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Container, Stack, Typography, TextField, Button } from '@mui/material';
import { MovieList } from '../sections/@dashboard/movies';
import MOVIES from '../_mock/movies';
import { useMovieList } from 'src/components/list-context/index.js';

const MAX_DISPLAYED_MOVIES = 5;

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedMovies, setDisplayedMovies] = useState(MAX_DISPLAYED_MOVIES);
  const { moveMovieToList, lists } = useMovieList();

  const filteredMovies = searchTerm
    ? MOVIES.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : MOVIES;

  const moviesToShow = filteredMovies.slice(0, displayedMovies);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDisplayedMovies(MAX_DISPLAYED_MOVIES); // Reset displayed movies when search changes
  };

  const handleLoadMore = () => {
    setDisplayedMovies(prevCount => prevCount + MAX_DISPLAYED_MOVIES);
  };

  return (
    <>
      <Helmet>
        <title>Search | MovieVerse</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movies
        </Typography>

        <TextField
          fullWidth
          label="Search movies"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />

        {moviesToShow.length > 0 ? (
          <>
            <MovieList
              movies={moviesToShow}
              onMoveMovieToList={moveMovieToList}
              lists={lists}
            />
            {filteredMovies.length > displayedMovies && (
              <Button onClick={handleLoadMore} sx={{ mt: 2 }}>
                Load More
              </Button>
            )}
          </>
        ) : (
          <Typography variant="h6">
            No movies match your search
          </Typography>
        )}
      </Container>
    </>
  );
}