import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../components/movie-cards/index.js';
import FloatingActionButtons from '../components/new-list-button/index.js';
import ListManager from '../components/list-manager/index.js'; // Importa el componente ListManager
import { mamma_mia, mamma_mia2, one_day, tokyo_drift } from 'src/assets/pictures';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

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
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Lists
            </Typography>
            <ListManager /> {/* Aquí se renderiza el componente ListManager */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
