import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import { useMovieList, MovieListProvider } from 'src/components/list-context/index.js'; // Import the MovieListProvider

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <MovieListProvider> {/* Wrap your app with MovieListProvider */}
            <Router />
          </MovieListProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
