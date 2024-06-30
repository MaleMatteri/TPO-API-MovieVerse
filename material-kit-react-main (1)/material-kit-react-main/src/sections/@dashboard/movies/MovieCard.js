import React from 'react';
import { Card, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import SelectVariants from 'src/components/button-dropdown/index.js'; // Ajustar la ruta según sea necesario
import Swal from 'sweetalert2'; // Importar SweetAlert2
import addItemToList from 'src/api/addItem.api';

const DEFAULT_IMAGE = '/assets/images/movies/no_hay_imagen6.jpg';

const StyledMovieImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const NewMovieCard = ({ movie, onMoveMovieToList = () => {}, listName = '', lists = [] }) => {
  
  const token = sessionStorage.getItem('access-token');

  const handleMoveMovieToList = async (selectedList) => {
    if (selectedList !== 'none') {
      try {
        if (lists[selectedList] && lists[selectedList].idList) {
          console.log('Adding item to list:', lists[selectedList].idList, movie.id, movie.type);
          console.log(movie.id.toString());
          const response = await addItemToList(token, lists[selectedList].idList, movie.id, movie.type);
          
          if (response.alreadyExists) {
            Swal.fire({
              title: 'Item Already Exists',
              text: `${movie.name} is already in the "${selectedList}" list.`,
              icon: 'info',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Item Added',
              text: `${movie.name} has been added to the "${selectedList}" list.`,
              icon: 'success',
              confirmButtonText: 'OK',
            });
            onMoveMovieToList(selectedList, movie); // Mover película solo si se agregó exitosamente
          }
          
        } else {
          console.error('List or listId not found:', lists[selectedList]);
          // Manejar el caso donde lists[selectedList] o lists[selectedList].idList no están definidos
        }
      } catch (error) {
        console.error('Error adding item to list:', error);
        // Manejar el error al agregar el ítem a la lista
        Swal.fire('Error', 'There was an error adding the movie to the list. Please try again.', 'error');
      }
    }
  };

  if (!movie) {
    return null;
  }

  const { name, cover, stars, language, type } = movie;
  //console.log(movie);
  return (
    <Card>
      
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledMovieImg 
          alt={name} 
          src={cover || DEFAULT_IMAGE}
          onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Typography variant="subtitle1" noWrap>
          {name}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Rating:
          </Typography>
          {stars ? (
            console.log(stars),
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              {Array.from({ length: stars }).map((_, index) => (
                <StarIcon key={index} style={{ color: '#ffe575' }} />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.disabled', ml: 1 }}>
              No rating available
            </Typography>
          )}
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          Language: {language}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.disabled' }}>
          Type: {type}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SelectVariants
            value={listName}
            onMoveMovieToList={handleMoveMovieToList}
            listNames={Object.keys(lists)}
            lists={lists}
          />
        </Box>
      </Stack>
    </Card>
  );
};

export default NewMovieCard;

