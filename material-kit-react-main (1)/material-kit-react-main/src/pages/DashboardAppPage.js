// DashboardAppPage.js
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import "react-multi-carousel/lib/styles.css";
import ListManager from '../components/list-manager/index.js';
import { MovieListProvider } from 'src/components/list-context/index.js'; // Importa el componente MovieListProvider

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
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Lists
            </Typography>
            <MovieListProvider> {/* Envuelve ListManager con MovieListProvider */}
              <ListManager />
            </MovieListProvider>
          </Box>
        </Box>
      </Container>
    </>
  );
}

