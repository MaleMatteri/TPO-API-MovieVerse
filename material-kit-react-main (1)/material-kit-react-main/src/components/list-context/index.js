import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import createMovieList from 'src/api/postCreateLists.api.js';
import getUserByToken from 'src/api/getUserByToken.api.js';
import getUserMovieLists from 'src/api/getLists.api'; 
import { Language } from '@mui/icons-material';

const MovieListContext = createContext();
export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
  const [lists, setLists] = useState({});

  useEffect(() => {
    const fetchLists = async () => {
      const token = sessionStorage.getItem('access-token');
      try {
        const userData = await getUserByToken(token);
        const userId = userData._id;
        const movieLists = await getUserMovieLists(token);
        console.log('Estas son las listas', movieLists);

        if (!Array.isArray(movieLists.lists)) {
          console.error('Expected an array but received:', movieLists);
          return;
        }

        const transformedLists = movieLists.lists.reduce((acc, list) => {
          acc[list.title.toLowerCase()] = {
            idList: list._id,
            items: list.items.map(item => ({
              id: item._id,
              type: item.type,
              
            }))
          };
          return acc;
        }, {});

        console.log('Estas son las listas transformadas', transformedLists);
        setLists(transformedLists);

      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const addList = async () => {
    const token = sessionStorage.getItem('access-token');

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
        const newList = await createMovieList(token, name);
        console.log('New list created:', newList);

        setLists(prevLists => ({
          ...prevLists,
          [name.toLowerCase()]: {
            idList: newList._id,
            items: [],
          }
        }));

        Swal.fire('Success', `List "${name}" created successfully.`, 'success');
      } catch (error) {
        console.error('Error creating movie list:', error);
        Swal.fire('Error', 'There was an error creating the list. Please try again.', 'error');
      }
    }
  };

  const moveMovieToList = (listName, movie) => {
    const newList = { ...lists };

    // Remove the movie from any existing lists
    Object.keys(newList).forEach(key => {
      newList[key].items = newList[key].items.filter(m => m.id !== movie.id);
    });

    // If the movie should be moved to a specific list, add it there
    if (listName !== 'none') {
      newList[listName].items = [...newList[listName].items, movie];
    }

    setLists(newList);
  };

  if (Object.keys(lists).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <MovieListContext.Provider value={{ lists, addList, moveMovieToList }}>
      {children}
    </MovieListContext.Provider>
  );
};
