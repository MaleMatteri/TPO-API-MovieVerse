import React, { createContext, useContext, useState, useEffect } from 'react';
import movies from 'src/_mock/movies.js'; // Import the movies list
import Swal from 'sweetalert2';

const MovieListContext = createContext();
export const useMovieList = () => {
  return useContext(MovieListContext);
};

export const MovieListProvider = ({ children }) => {
  const [lists, setLists] = useState({ watching: [], watched: [], favorites: [] });

  useEffect(() => {
    const initialLists = {
      watching: [], 
      watched: [],
      favorites: [],
    };
    setLists(initialLists);
  }, []);

  const addList = async (newListName) => {
    const { value: name } = await Swal.fire({
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

    if (name) {
      setLists(prevLists => ({ ...prevLists, [name.toLowerCase()]: [] }));
    }
  };

  const moveMovieToList = (listName, movie) => {
    if (listName === 'none') {
      const newList = { ...lists };
      Object.keys(newList).forEach(key => {
        newList[key] = newList[key].filter(m => m.id !== movie.id);
      });
      setLists(newList);
      return;
    }

    // Otherwise, add the movie to the selected list
    const newList = { ...lists };
    Object.keys(newList).forEach(key => {
      newList[key] = newList[key].filter(m => m.id !== movie.id);
    });
    newList[listName] = [...newList[listName], movie];
    setLists(newList);
  };

  return (
    <MovieListContext.Provider value={{ lists, addList, moveMovieToList }}>
      {children}
    </MovieListContext.Provider>
  );
};