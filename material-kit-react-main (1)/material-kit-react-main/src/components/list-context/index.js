import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la redirección
import Swal from 'sweetalert2';
import createMovieList from 'src/api/postCreateLists.api.js';
import getUserByToken from 'src/api/getUserByToken.api.js';
import getUserMovieLists from 'src/api/getLists.api'; 
import searchContentByIdAndType from 'src/api/itemDetails.api.js';

const MovieListContext = createContext();
export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
  const [lists, setLists] = useState(null); // Cambiado a null para diferenciar entre no cargado y vacío
  const [loading, setLoading] = useState(true); // Nuevo estado para el estado de carga
  const [error, setError] = useState(null); // Nuevo estado para manejar errores
  const navigate = useNavigate(); // Instancia useNavigate para manejar la redirección

  useEffect(() => {
    const fetchLists = async () => {
      const token = sessionStorage.getItem('access-token'); // Obtener el token de sessionStorage
      if (!token) {
        setLoading(false);
        setError('No access token found !!');
        navigate('/login'); // Redirigir al login si no hay token
        return;
      }

      try {
        const userData = await getUserByToken(token);
        const movieLists = await getUserMovieLists(token);
        console.log('Estas son las listas', movieLists); // Registrar las listas de películas obtenidas

        if (!Array.isArray(movieLists.lists)) {
          throw new Error('Expected an array but received: ' + JSON.stringify(movieLists));
        }

        const transformedLists = await movieLists.lists.reduce(async (accPromise, list) => {
          const acc = await accPromise;
          const itemsDetailsPromises = list.items.map(async (item) => {
            try {
              const itemDetails = await searchContentByIdAndType(item.tmdbId, item.type); // Paso 2
              console.log('Item details:', itemDetails);

              return {
                id: itemDetails.id,
                type: item.type,
                cover: itemDetails.poster_path ? `https://image.tmdb.org/t/p/w500${itemDetails.poster_path}` : `/assets/images/movies/no_hay_imagen6.jpg`,
                name: item.type === 'movie' ? itemDetails.original_title : itemDetails.original_name,
                stars: Math.round(itemDetails.vote_average / 2),
                language: itemDetails.original_language,
              };
            } catch (error) {
              console.error('Error fetching item details:', error);
              return item;
            }
          });

          const itemsDetails = await Promise.all(itemsDetailsPromises); // Paso 3

          acc[list.title.toLowerCase()] = {
            idList: list._id,
            items: itemsDetails
          };

          return acc;
        }, Promise.resolve({}));

        console.log('Estas son las listas transformadas', transformedLists);
        setLists(transformedLists);

      } catch (error) {
        console.error('Error fetching lists:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const token = sessionStorage.getItem('access-token');
    if (token) {
      fetchLists();
    } else {
      setLoading(false);
      navigate('/login'); // Redirigir al login si no hay token
    }
  }, [navigate]);

  const addList = async () => {
    const token = sessionStorage.getItem('access-token'); // Obtener el token de sessionStorage

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

    console.log('List name:', name);

    if (name) {
      try {
        console.log('Creating list:', name);
        const newList = await createMovieList(token, name);
        console.log('New list created:', newList);
  
        // Update the state with the new list
        setLists(prevLists => ({
          ...prevLists,
          [name.toLowerCase()]: {
            idList: newList._id,
            items: []
          },
        }));
        
        Swal.fire('Success', `List "${name}" created successfully.`, 'success');
  
        // Fetch the updated lists from the server
        const updatedMovieLists = await getUserMovieLists(token);
        const transformedLists = await transformLists(updatedMovieLists.lists);
        setLists(transformedLists);
  
      } catch (error) {
        console.error('Error creating movie list:', error);
        Swal.fire('Error', 'There was an error creating the list. Please try again.', 'error');
      }
    }
  };
  
  // Add this helper function to transform the lists
  const transformLists = async (lists) => {
    const transformedLists = await lists.reduce(async (accPromise, list) => {
      const acc = await accPromise;
      const itemsDetailsPromises = list.items.map(async (item) => {
        try {
          const itemDetails = await searchContentByIdAndType(item.tmdbId, item.type);
          return {
            id: itemDetails.id,
            type: item.type,
            cover: itemDetails.poster_path ? `https://image.tmdb.org/t/p/w500${itemDetails.poster_path}` : `/assets/images/movies/no_hay_imagen6.jpg`,
            name: item.type === 'movie' ? itemDetails.original_title : itemDetails.original_name,
            stars: Math.round(itemDetails.vote_average / 2),
            language: itemDetails.original_language,
          };
        } catch (error) {
          console.error('Error fetching item details:', error);
          return item;
        }
      });
  
      const itemsDetails = await Promise.all(itemsDetailsPromises);
  
      acc[list.title.toLowerCase()] = {
        idList: list._id,
        items: itemsDetails
      };
  
      return acc;
    }, Promise.resolve({}));
  
    return transformedLists;
  };

  const moveMovieToList = (listName, movie, removeFromOthers = true) => {
    setLists(prevLists => {
      const newLists = { ...prevLists };
      
      // If removeFromOthers is true, remove the movie from all other lists
      if (removeFromOthers) {
        Object.keys(newLists).forEach(key => {
          if (key !== listName) {
            newLists[key].items = newLists[key].items.filter(m => m.id !== movie.id);
          }
        });
      }
      
      // Add the movie to the selected list if it's not already there
      if (!newLists[listName].items.some(m => m.id === movie.id)) {
        newLists[listName].items = [...newLists[listName].items, movie];
      }
      
      return newLists;
    });
  };

  const removeMovieFromList = (listName, movieId) => {
    setLists(prevLists => {
      const updatedList = { ...prevLists };
      if (updatedList[listName]) {
        updatedList[listName].items = updatedList[listName].items.filter(movie => movie.id !== movieId);
      }
      return updatedList;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lists || Object.keys(lists).length === 0) {
    return <div>No lists available</div>;
  }

  return (
    <MovieListContext.Provider value={{ lists, addList, moveMovieToList, removeMovieFromList }}>
      {children}
    </MovieListContext.Provider>
  );
};

