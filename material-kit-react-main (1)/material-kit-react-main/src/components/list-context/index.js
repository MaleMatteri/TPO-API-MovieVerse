import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import createMovieList from 'src/api/postCreateLists.api.js';
import getUserByToken from 'src/api/getUserByToken.api.js';
import getUserMovieLists from 'src/api/getLists.api'; 

const MovieListContext = createContext();
export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
  const [lists, setLists] = useState({});

  useEffect(() => {
    const fetchLists = async () => {
      const token = sessionStorage.getItem('access-token'); // Get the token from sessionStorage
      try {
        const userData = await getUserByToken(token);
        const userId = userData._id;
        const movieLists = await getUserMovieLists(token);
        console.log('Fetched movie lists:', movieLists); // Log the fetched movie lists

        if (!Array.isArray(movieLists.lists)) {
          console.error('Expected an array but received:', movieLists);
          return;
        }

        const transformedLists = movieLists.lists.reduce((acc, list) => {
          acc[list.title.toLowerCase()] = list.items.map(item => ({
            id: item.itemId._id, // Assuming itemId is the reference ID field in your schema
            type: item.type,
            // Add other necessary fields from your item schema
          }));
          return acc;
        }, {});
        setLists(transformedLists);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const addList = async () => {
    const token = sessionStorage.getItem('access-token'); // Get the token from sessionStorage

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
        const newList = await createMovieList(token, name); 
        console.log('New list created:', newList);

        // Update the state with the newly created list
        setLists(prevLists => ({
          ...prevLists,
          [name.toLowerCase()]: [], // Use the list title as the key
        }));
        
        Swal.fire('Success', `List "${name}" created successfully.`, 'success');
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
