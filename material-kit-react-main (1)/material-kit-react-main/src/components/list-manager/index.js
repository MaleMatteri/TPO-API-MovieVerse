import React, { useState } from 'react';
import MovieCard from 'src/components/movie-cards/index.js'; 
import { mamma_mia, mamma_mia2, one_day, tokyo_drift } from 'src/assets/pictures'; // Import your images
import SelectVariants from 'src/components/button-dropdown/index.js'; // Import the SelectVariants component

const MovieListManager = () => {
  const [lists, setLists] = useState({
    watching: [
      { id: 1, title: 'Mamma Mia: Here we go again', image: mamma_mia2, ratingValue: 5 },
    ],
    watched: [
      { id: 2, title: 'Mamma mia', image: mamma_mia, ratingValue: 5 },
      { id: 4, title: 'Tokyo Drift', image: tokyo_drift, ratingValue: 4 }
    ],
    favorites: [
      { id: 3, title: 'One Day', image: one_day, ratingValue: 4 },
    ],
    // Add more lists as needed
  });

  // Function to move a movie to a different list
  const handleMoveMovieToList = (listName, movie) => {
    const newList = { ...lists };
    Object.keys(newList).forEach(key => {
      newList[key] = newList[key].filter(m => m.id !== movie.id);
    });
    newList[listName] = [...newList[listName], movie];
    setLists(newList);
  };

  // Function to handle list change
  const handleListChange = (event, movie) => {
    const newListName = event.target.value;
    handleMoveMovieToList(newListName, movie);
  };

  return (
    <div>
      {/* Render the Watching list */}
      <h2>Watching</h2>
{       lists.watching.map(movie => (
        <div key={movie.id}>
            <MovieCard
                title={movie.title}
                image={movie.image}
                ratingValue={movie.ratingValue}
                movieId={movie.id}
                onAddToList={handleMoveMovieToList}
                onSelectChange={(event) => handleListChange(event, movie)} // Pass movie to handleListChange
            />
        </div>
      ))}

      {/* Render the Watched list */}
      <h2>Watched</h2>
      {lists.watched.map(movie => (
        <div key={movie.id}>
          <MovieCard
            title={movie.title}
            image={movie.image}
            ratingValue={movie.ratingValue}
            movieId={movie.id}
            onAddToList={handleMoveMovieToList}
          />
        </div>
      ))}

      {/* Render the Favorites list */}
      <h2>Favorites</h2>
      {lists.favorites.map(movie => (
        <div key={movie.id}>
          <MovieCard
            title={movie.title}
            image={movie.image}
            ratingValue={movie.ratingValue}
            movieId={movie.id}
            onAddToList={handleMoveMovieToList}
          />
        </div>
      ))}

      {/* Render other lists similarly */}
    </div>
  );
};

export default MovieListManager;
