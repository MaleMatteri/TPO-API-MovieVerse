import React, { useState, useEffect } from 'react';
import { useMovieList } from 'src/components/list-context/index.js';
import NewMovieCard from 'src/sections/@dashboard/movies/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'src/components/list-manager/index.css';
import EmptyListCard from '../empty-list-card';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import getMoviesAndTvShows from 'src/api/getMoviesAndTvShow.api.js';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const ListManager = () => {
  const { lists, addList, moveMovieToList, removeMovieFromList } = useMovieList();
  const [moviesAndTvShows, setMoviesAndTvShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getMoviesAndTvShows();
        const transformedMovies = data.movies.map((movie) => ({
          id: movie.id,
          cover: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `/assets/images/movies/no_hay_imagen6.jpg`,
          name: movie.original_title,
          stars: Math.round(movie.vote_average / 2),
          language: movie.original_language,
          type: 'movie'
        }));
        const transformedTvShows = data.tvShows.map((tvShow) => ({
          id: tvShow.id,
          cover: tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : `/assets/images/movies/no_hay_imagen6.jpg`,
          name: tvShow.original_name,
          stars: Math.round(tvShow.vote_average / 2),
          language: tvShow.original_language,
          type: 'tv',
        }));
        setMoviesAndTvShows([...transformedMovies, ...transformedTvShows]);
      } catch (error) {
        console.error('Error fetching movies and TV shows:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMovie = (listName, movieId) => {
    removeMovieFromList(listName, movieId);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderMovieCards = (listName) => {
    if (!lists[listName] || lists[listName].items.length === 0) {
      return (
        <div style={{ padding: '30px' }}>
          <EmptyListCard />
        </div>
      );
    } else {
      return (
        <Carousel responsive={responsive} itemClass="carousel-item" containerClass="carousel-container">
          {lists[listName].items.map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <NewMovieCard
                movie={movie}
                listName={listName}
                lists={lists}
                onMoveMovieToList={(selectedList) => moveMovieToList(selectedList, movie)}
                onDeleteMovie={handleDeleteMovie}
              />
            </div>
          ))}
        </Carousel>
      );
    }
  };

  const renderFetchedMovies = () => {
    const limitedMovies = moviesAndTvShows.slice(0, 5); // Limit to 5 movies
    if (limitedMovies.length === 0) {
      return (
        <div style={{ padding: '30px' }}>
          <EmptyListCard />
        </div>
      );
    } else { 
      return (
        <Carousel responsive={responsive} itemClass="carousel-item" containerClass="carousel-container">
          {limitedMovies.map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <NewMovieCard
                movie={movie}
                listName="fetchedMovies"
                lists={lists}
                onMoveMovieToList={(selectedList) => moveMovieToList(selectedList, movie)}
              />
            </div>
          ))}
        </Carousel>
      );
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Fab variant="extended" color="primary" onClick={addList}>
          <AddIcon />
          New List
        </Fab>
      </div>
      <div>
        <h3>New in!</h3>
        {isLoading ? <p>Loading...</p> : renderFetchedMovies()}
      </div>
      {Object.keys(lists).map(listName => (
        <div key={listName}>
          <h3>{capitalizeFirstLetter(listName)}</h3>
          {renderMovieCards(listName)}
        </div>
      ))}
    </div>
  );
};

export default ListManager;