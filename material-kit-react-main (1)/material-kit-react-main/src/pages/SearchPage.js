import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Container, Stack, Typography, TextField } from '@mui/material';
import { MovieList } from '../sections/@dashboard/movies';
import MOVIES from '../_mock/movies';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar películas basadas en el término de búsqueda
  const filteredMovies = MOVIES.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejar el cambio en la barra de búsqueda
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

        {/* Barra de búsqueda */}
        <TextField
          fullWidth
          label="Search movies"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
        />

        {/* Mostrar películas filtradas */}
        <MovieList movies={filteredMovies} />
      </Container>
    </>
  );
}
