import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import createMovieList from 'src/api/postCreateLists.api.js';

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

  const addList = async () => {
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
      try {
        // Call the backend API to create the list
        const newList = await createMovieList(name, []);
        // Update the state with the newly created list
        setLists(prevLists => ({ ...prevLists, [newList.title.toLowerCase()]: [] }));
      } catch (error) {
        console.error('Error creating movie list:', error);
        Swal.fire('Error', 'There was an error creating the list. Please try again.', 'error');
      }
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
