import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography } from '@mui/material';
// hooks
import { Link as RouterLink } from 'react-router-dom';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';

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

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | MultiVerse </title>
      </Helmet>

      <StyledRoot>
        <Logo
          src="/assets/Logo/MovieVerse.png" // Pasar la ruta correcta del logo aquí
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ color: 'white', px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/LogoMovieVerse_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm" sx={{ backgroundColor: mdUp ? 'inherit' : '#00305A' }}>
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ color: mdUp ? 'inherit' : 'white' }}>
              Sign in to MovieVerse
            </Typography>

            <Typography variant="body2" sx={{ mb: 5, color: mdUp ? 'inherit' : 'white' }}>
              Don’t have an account? {''}
              <Link to="/register" component={RouterLink} variant="subtitle2">
                Get started!
              </Link>
            </Typography>

            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
