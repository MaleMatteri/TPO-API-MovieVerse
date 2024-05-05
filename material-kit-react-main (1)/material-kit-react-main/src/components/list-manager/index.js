import React from 'react';
import movies from 'src/_mock/movies.js';
import NewMovieCard from 'src/sections/@dashboard/movies/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'src/components/list-manager/index.css';
import EmptyListCard from '../empty-list-card';import { Padding } from '@mui/icons-material';
'src/components/empty-list-card/index.js';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const MovieListManager = () => {
  const [lists, setLists] = React.useState({
    watching: [],
    watched: [],
    favorites: [],
  });

  React.useEffect(() => {
    const initialLists = {
      watching: [],
      watched: [],
      favorites: [],
    };

    movies.forEach(movie => {
      initialLists.watching.push(movie);
    });

    setLists(initialLists);
  }, []);

  const onMoveMovieToList = (listName, movie) => {
    const newList = { ...lists };
    Object.keys(newList).forEach(key => {
      newList[key] = newList[key].filter(m => m.id !== movie.id);
    });
    newList[listName] = [...newList[listName], movie];
    setLists(newList);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderMovieCards = (listName) => {
    if (lists[listName].length === 0) {
      return (
        <div style={{ padding: '30px' }}>
          <EmptyListCard/>
        </div>
        /*<div className="empty-list-card">
          <p>Add new movies</p>
        </div>*/
      );
    } else {
      return (
        <Carousel 
          responsive={responsive} 
          itemClass="carousel-item" 
          containerClass="carousel-container" 
        >
          {lists[listName].map((movie, index) => (
            <div key={movie.id} className="movie-card-container">
              <NewMovieCard
                movie={movie}
                listName={listName}
                onMoveMovieToList={(selectedList) => onMoveMovieToList(selectedList, movie)}
              />
            </div>
          ))}
        </Carousel>
      );
    }
  };

  return (
    <div>
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
