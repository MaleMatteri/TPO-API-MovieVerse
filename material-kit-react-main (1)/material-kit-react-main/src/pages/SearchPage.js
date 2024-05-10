import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Container, Stack, Typography, TextField } from '@mui/material';
import { MovieList } from '../sections/@dashboard/movies';
import MOVIES from '../_mock/movies';
import { useMovieList } from 'src/components/list-context/index.js'; // Import the movie list context hook

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { moveMovieToList, lists } = useMovieList(); // Use the movie list context hook

  const filteredMovies = searchTerm
    ? MOVIES.filter((movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : MOVIES;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

        {filteredMovies.length > 0 ? (
          <MovieList
            movies={filteredMovies}
            onMoveMovieToList={moveMovieToList} // Pass the moveMovieToList function
            lists={lists}
          />
        ) : (
          <Typography variant="h6">
            No hay películas que coincidan con tu búsqueda
          </Typography>
        )}
      </Container>
    </>
  );
}
