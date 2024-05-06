import PropTypes from 'prop-types';
import { Box, Card, Typography, Stack, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import SelectVariants from 'src/components/button-dropdown/index.js';
import 'src/sections/@dashboard/movies/index.css';

const StyledMovieImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

NewMovieCard.propTypes = {
  movie: PropTypes.object,
};

export default function NewMovieCard({ movie, onMoveMovieToList, listName }) {
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
          <SelectVariants value={listName} onMoveMovieToList={(selectedList) => onMoveMovieToList(selectedList, movie)} />
        </Box>
      </Stack>
    </Card>
  );
}
