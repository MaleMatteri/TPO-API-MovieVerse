import React from 'react';
import { useMovieList } from 'src/components/list-context/index.js';
import NewMovieCard from 'src/sections/@dashboard/movies/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'src/components/list-manager/index.css';
import EmptyListCard from '../empty-list-card';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

const MovieListManager = () => {
  const { lists, addList, moveMovieToList } = useMovieList();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderMovieCards = (listName) => {
    if (lists[listName].length === 0) {
      return (
        <div style={{ padding: '30px' }}>
          <EmptyListCard />
        </div>
      );
    } else {
      return (
        <Carousel responsive={responsive} itemClass="carousel-item" containerClass="carousel-container" >
          {lists[listName].map((movie, index) => (
            <div key={movie.id} className="movie-card-container">
              <NewMovieCard
                movie={movie}
                listName={listName}
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
      {Object.keys(lists).map(listName => (
        <div key={listName}>
          <h3>{capitalizeFirstLetter(listName)}</h3>
          {renderMovieCards(listName)}
        </div>
      ))}
    </div>
  );
};

export default MovieListManager;