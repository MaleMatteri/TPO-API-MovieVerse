import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, TextField, Button, CircularProgress, Stack } from '@mui/material';
import { MovieList } from '../sections/@dashboard/movies';
import getMoviesAndTvShows from '../api/getMoviesAndTvShow.api';
import searchMoviesAndTvShows from '../api/getSearchMovieAndTvShow.api';
import { useMovieList } from 'src/components/list-context/index.js';

const MAX_DISPLAYED_ITEMS = 20;

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [moviesAndTvShows, setMoviesAndTvShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [displayedItems, setDisplayedItems] = useState(MAX_DISPLAYED_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const { moveMovieToList, lists } = useMovieList();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMoviesAndTvShows();
        const transformedMovies = data.movies.map((movie, index) => ({
          id: movie.id,
          cover: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `/assets/images/movies/movie_${index + 1}.jpg`,
          name: movie.title,
          stars: Math.round(movie.vote_average / 2),
          language: movie.original_language,
          type: 'Movie',
        }));
        const transformedTvShows = data.tvShows.map((tvShow, index) => ({
          id: tvShow.id,
          cover: tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : `/assets/images/movies/movie_${index + 1}.jpg`,
          name: tvShow.name,
          stars: Math.round(tvShow.vote_average / 2),
          language: tvShow.original_language,
          type: 'TV Show',
        }));
        setMoviesAndTvShows([...transformedMovies, ...transformedTvShows]);
        setDisplayedItems(MAX_DISPLAYED_ITEMS);
      } catch (error) {
        console.error('Error fetching movies and TV shows:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;

    setIsLoading(true);
    try {
      const results = await searchMoviesAndTvShows(searchTerm);
      const transformedResults = results.map(item => ({
        id: item.id,
        cover: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : `/assets/images/placeholder.jpg`,
        name: item.title || item.name,
        stars: Math.round((item.vote_average || 0) / 2),
        language: item.original_language,
        type: item.media_type === 'movie' ? 'Movie' : 'TV Show',
      }));
      setSearchResults(transformedResults);
      setDisplayedItems(MAX_DISPLAYED_ITEMS);
    } catch (error) {
      console.error('Error searching movies and TV shows:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setDisplayedItems(prevCount => prevCount + MAX_DISPLAYED_ITEMS);
  };

  const filteredItems = searchTerm ? searchResults : moviesAndTvShows;
  const itemsToShow = filteredItems.slice(0, displayedItems);

  return (
    <>
      <Helmet>
        <title>Search | MovieVerse</title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Movies and TV Shows
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search movies and TV shows"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            id="search-input"
          />
          <Button onClick={handleSearch} variant="contained">
            Search
          </Button>
        </Stack>

        {isLoading ? (
          <CircularProgress />
        ) : itemsToShow.length > 0 ? (
          <>
            <MovieList
              movies={itemsToShow}
              onMoveMovieToList={moveMovieToList}
              lists={lists}
            />
            {filteredItems.length > displayedItems && (
              <Button onClick={handleLoadMore} sx={{ mt: 2 }}>
                Load More
              </Button>
            )}
          </>
        ) : (
          searchTerm && <Typography variant="h6">
            No movies or TV shows match your search
          </Typography>
        )}
      </Container>
    </>
  );
}
