import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import { CardActions } from '@mui/material';
import SelectVariants from 'src/components/button-dropdown/index.js';
import 'src/sections/@dashboard/movies/index.css';

// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledMovieImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

NewMovieCard.propTypes = {
  movie: PropTypes.object,
};

export default function NewMovieCard({ movie, onMoveMovieToList, listName}) {
  const { name, cover, stars } = movie;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledMovieImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle1" noWrap>
            {name}
          </Typography>

        <Stack direction="row" alignItems="left" justifyContent="space-between">
          
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
            
            </Typography>
          </Typography>
          <div className="bottom-element">
            <CardActions>
             <SelectVariants 
                  value={listName}
                  onMoveMovieToList={(selectedList) => onMoveMovieToList(selectedList, movie)}/>
            </CardActions>
          </div>
        </Stack>

        {stars && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zIndex: 9,
              backgroundColor: 'rgba(0, 0, 0, 0)', // Amarillo con opacidad
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {Array.from({ length: stars }).map((_, index) => (
              <StarIcon key={index} style={{ color: '#ffe575' }} />
            ))}
          </div>
        )}
      </Stack>
    </Card>
  );
}