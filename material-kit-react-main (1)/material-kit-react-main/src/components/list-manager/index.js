// MovieListManager.js
import React from 'react';
import SelectVariants from 'src/components/button-dropdown/index.js'; 
import movies from 'src/_mock/movies.js'; // Ruta al archivo de películas
import NewMovieCard from 'src/sections/@dashboard/movies/MovieCard';

const MovieListManager = () => {
  const [lists, setLists] = React.useState({
    watching: [],
    watched: [],
    favorites: [],
  });

  // Inicializar las listas de películas usando las películas del archivo
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

  return (
    <div>
      {Object.keys(lists).map(listName => (
        <div key={listName}>
          <h2>{listName}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {lists[listName].map(movie => (
              <div key={movie.id} style={{ flex: '0 1 calc(33.333% - 10px)', maxWidth: 'calc(33.333% - 10px)', marginBottom: '10px' }}>
                <NewMovieCard
                  movie={movie}
                  listName={listName}
                  onMoveMovieToList={(selectedList) => onMoveMovieToList(selectedList, movie)} // Pasa la función onMoveMovieToList
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieListManager;
