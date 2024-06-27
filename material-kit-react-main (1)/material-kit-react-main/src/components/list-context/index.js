import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import createMovieList from 'src/api/postCreateLists.api.js'; // Ajusta la ruta según sea necesario
import getUserLists from 'src/api/getLists';

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
    const token = sessionStorage.getItem('access-token'); // Obtener el token desde sessionStorage

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

        // Actualizar el estado con la nueva lista creada
        setLists(prevLists => ({
          ...prevLists,
          [name]: [], // Usando el título de la lista como clave
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
