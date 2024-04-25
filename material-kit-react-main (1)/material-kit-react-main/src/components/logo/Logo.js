import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import './index.css';
 

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, src, ...other }, ref) => {
  const theme = useTheme();

  // Define the logo image element
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 130,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src={'/assets/Logo/MovieVerse.png'} alt="Logo" width="500%" height="200%" />
    </Box>
  );

  // Render the logo without a link if disabledLink is true
  if (disabledLink) {
    return <>{logo}</>;
  }

  // Render the logo as a link if disabledLink is false
  return (
    <Link to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

// PropTypes definition
Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string.isRequired, // Add src prop for the image path
};

export default Logo;
