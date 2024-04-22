import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// sections

import MovieCard from '../components/movie-cards/index.js';
import { mamma_mia, mamma_mia2, one_day, tokyo_drift } from 'src/assets/pictures';
import FloatingActionButtons from '../components/new-list-button/index.js';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

 

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Home | MovieVerse </title>
      </Helmet>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
        <Typography variant="h6" sx={{ mb: 5 }}>
            Watching
        </Typography>
        <Carousel responsive={responsive} >
          <MovieCard
                title = 'Mamma mia'
                image={mamma_mia}
                ratingValue={5}/>
          <MovieCard
                title = 'Mamma mia: Here we go again'
                image={mamma_mia2}
                ratingValue={5}/>
          <MovieCard
                title = 'Tokyo Drift'
                image={tokyo_drift}
                ratingValue={5}/>
          <MovieCard
                title = 'One day'
                image={one_day}
                ratingValue={5}/>
        </Carousel>
        <Typography variant="h6" sx={{ mt: 5, mb: 5 }}>
            Watched
        </Typography>
        <Carousel responsive={responsive} >
          <MovieCard
                title = 'Mamma mia (2008)'
                image={mamma_mia}
                ratingValue={5}/>
          <MovieCard
                title = 'Mamma mia (2008)'
                image={mamma_mia}
                ratingValue={5}/>
          <MovieCard
                title = 'Mamma mia (2008)'
                image={mamma_mia}
                ratingValue={5}/>
          <MovieCard
                title = 'Mamma mia (2008)'
                image={mamma_mia}
                ratingValue={5}/>
        </Carousel>
        <Box
            sx={{
              position: 'fixed',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
              zIndex: 1000
            }}
          >
            <FloatingActionButtons />
          </Box>
        </Box>
      </Container>
    </>
  );
}
