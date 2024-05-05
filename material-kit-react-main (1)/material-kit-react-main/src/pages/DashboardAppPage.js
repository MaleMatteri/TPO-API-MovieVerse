import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from '../components/movie-cards/index.js';
import FloatingActionButtons from '../components/new-list-button/index.js';
import ListManager from '../components/list-manager/index.js'; // Importa el componente ListManager

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Home | MovieVerse </title>
      </Helmet>

      <Container maxWidth="xl">
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <Typography variant="h2" sx={{ mb: 5 }}>
            Hi, welcome back
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
            <Typography variant="h3" sx={{ mb: 2 }}>
              Lists
            </Typography>
            <ListManager />
          </Box>
        </Box>
      </Container>
    </>
  );
}
