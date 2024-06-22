import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, TextField, Button } from '@mui/material';
import { MovieList } from '../sections/@dashboard/movies';
import getMoviesAndTvShows from '../api/getMoviesAndTvShow.api';
import { useMovieList } from 'src/components/list-context/index.js';
import { faker } from '@faker-js/faker';

const MAX_DISPLAYED_MOVIES = 5;

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesAndTvShows, setMoviesAndTvShows] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState(MAX_DISPLAYED_MOVIES);
  const { moveMovieToList, lists } = useMovieList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMoviesAndTvShows();
        console.log(data); // Verificar los datos recibidos en la consola
        // Transformar los datos de la API al formato esperado por MovieList
        const transformedMovies = data.movies.map((movie, index) => ({
          id: movie.id,
          cover: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `/assets/images/movies/movie_${index + 1}.jpg`,
          name: movie.title,
          stars: Math.round(movie.vote_average / 2), // Transformar la calificación a una escala de 1 a 5
          language: movie.original_language, // Agregar información de actores si está disponible
          type: 'Movie',
        }));
        const transformedTvShows = data.tvShows.map((tvShow, index) => ({
          id: tvShow.id,
          cover: tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : `/assets/images/movies/movie_${index + 1}.jpg`,
          name: tvShow.name,
          stars: Math.round(tvShow.vote_average / 2), // Transformar la calificación a una escala de 1 a 5
          language: tvShow.original_language, // Agregar información de actores si está disponible
          type: 'TV Show',
        }));
        setMoviesAndTvShows([...transformedMovies, ...transformedTvShows]);
      } catch (error) {
        console.error('Error fetching movies and tv shows:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDisplayedMovies(MAX_DISPLAYED_MOVIES); // Reiniciar la cantidad mostrada al cambiar la búsqueda
  };

  const handleLoadMore = () => {
    setDisplayedMovies(prevCount => prevCount + MAX_DISPLAYED_MOVIES);
  };

  const filteredItems = searchTerm
    ? moviesAndTvShows.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : moviesAndTvShows;

  const itemsToShow = filteredItems.slice(0, displayedMovies);

  return (
    <>
      <Helmet>
        <title>Search | MovieVerse</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movies and TV Shows
        </Typography>

        <TextField
          fullWidth
          label="Search movies and TV shows"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          id="search-input" // Asegúrate de agregar un id único al input
        />

        {itemsToShow.length > 0 ? (
          <>
            <MovieList
              movies={itemsToShow}
              onMoveMovieToList={moveMovieToList}
              lists={lists}
            />
            {filteredItems.length > displayedMovies && (
              <Button onClick={handleLoadMore} sx={{ mt: 2 }}>
                Load More
              </Button>
            )}
          </>
        ) : (
          <Typography variant="h6">
            No movies or TV shows match your search
          </Typography>
        )}
      </Container>
    </>
  );
}
