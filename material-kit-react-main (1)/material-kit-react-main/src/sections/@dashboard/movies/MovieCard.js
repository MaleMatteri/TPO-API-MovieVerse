// NewMovieCard.js

import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import SelectVariants from 'src/components/button-dropdown/index.js'; // Adjust the path as needed

const StyledMovieImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const NewMovieCard = ({ movie, onMoveMovieToList = () => {}, listName = '', lists = [] }) => { 
  // aca faltaba inicializar los valores de listName y lists para que si venian null o undefined no rompa

  if (!movie) { // aca valida que movie no sea null o undefined y si es no muestra esa pelicula
    return null;
  }
  const { name, cover, stars, cast } = movie;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledMovieImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle1" noWrap>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Rating:
          </Typography>
          {stars && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              {Array.from({ length: stars }).map((_, index) => (
                <StarIcon key={index} style={{ color: '#ffe575' }} />
              ))}
            </Box>
          )}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          Cast: {cast}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SelectVariants
            value={listName}
            onMoveMovieToList={(selectedList) => onMoveMovieToList(selectedList, movie)}
            listNames={Object.keys(lists)}
            lists={lists} // Pass lists prop to SelectVariants component
          />
        </Box>
      </Stack>
    </Card>
  );
};

export default NewMovieCard;
