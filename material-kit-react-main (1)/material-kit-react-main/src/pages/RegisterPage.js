import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { RegisterForm } from '../sections/auth/login';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.azul,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Sing up | MultiVerse </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ color: 'white', px: 5, mt: 10, mb: 5 }}>
            Hello, Welcome to our Movie Multiverse!
            </Typography>
            <img src="/assets/illustrations/imagen_pelicula.png" alt="register"/>
          </StyledSection>
        )}

        <Container maxWidth="sm" sx={{ backgroundColor: mdUp ? 'inherit' : '#00305A' }}>
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ color: mdUp ? 'inherit' : 'white' }}>
            Sign up to Movieverse
            </Typography>

            <Typography variant="body2" sx={{ mb: 5, color: mdUp ? 'inherit' : 'white' }}>
              You have an account? {''}
              <Link to="/login" component={RouterLink} variant="subtitle2"> 
                Log in to your account!
              </Link>
            </Typography>

            <RegisterForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
