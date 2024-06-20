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

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 145,
        height: 88,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img src={src} alt="Logo" style={{ width: '100%', height: '100%' }} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

export default Logo;


