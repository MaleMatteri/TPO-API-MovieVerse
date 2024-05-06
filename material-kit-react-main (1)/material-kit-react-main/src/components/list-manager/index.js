// MovieListManager.js
import React, { useState, useEffect } from 'react';
import movies from 'src/_mock/movies.js';
import NewMovieCard from 'src/sections/@dashboard/movies/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'src/components/list-manager/index.css';
import EmptyListCard from '../empty-list-card';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const MovieListManager = () => {
  const [lists, setLists] = useState({
    watching: [],
    watched: [],
    favorites: [],
  });

  useEffect(() => {
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

  const handleAddList = async () => {
    const { value: newListName } = await Swal.fire({
      title: 'Enter the name for the new list:',
      input: 'text',
      inputPlaceholder: 'Enter the name for the new list',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      preConfirm: (name) => {
        if (!name) {
          Swal.showValidationMessage('List name cannot be empty');
        }
        return name;
      }
    });

    if (newListName) {
      setLists(prevLists => ({
        ...prevLists,
        [newListName.toLowerCase()]: [], // Create a new empty list with the given name
      }));
    }
  };

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
                lists={lists} // Pass the lists state as a prop
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Fab variant="extended" color="primary" onClick={handleAddList}>
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
