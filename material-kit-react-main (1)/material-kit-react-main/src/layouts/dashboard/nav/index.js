import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import getUserByToken from 'src/api/getUserByToken.api'; // Asegúrate de que la ruta sea correcta

import navConfig from './config';
import './index.css';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  useEffect(() => {
    // Función asincrónica para obtener datos del usuario por el token
    const fetchUserData = async () => {
      const accessToken = sessionStorage.getItem('access-token'); // Obtener token de sesión
      if (accessToken) {
        try {
          const response = await getUserByToken(accessToken);
          
          if (response.status === 200) {
            // Actualizar el estado con los datos del usuario obtenidos
            setUser({
              displayName: `${response.data.name} ${response.data.surname}`,
              email: response.data.email,
              photoURL: '/assets/images/avatars/avatar_default.jpg', // Debes obtener la URL de la imagen del usuario si está disponible
            });
          } else {
            console.log('Error:', response.message);
          }
        } catch (error) {
          console.error('Error durante la obtención de datos del usuario:', error);
          // Manejar el error apropiadamente
        }
      }
    };

    fetchUserData(); // Llamar a la función para obtener los datos del usuario
  }, [pathname]); // Dependencia vacía para que se ejecute solo una vez

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ mb: 5, px: 2.5, py: 3, display: 'inline-flex' }} className='Box'>
        <Logo src="/assets/Logo/MovieVerse.png" />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }} className='Box'>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={user?.photoURL || '/assets/images/avatars/avatar_4.jpg'} alt="photoURL" />

            <Box sx={{ ml: 2 }} >
              <Typography variant="subtitle2" sx={{ color: 'text.third' }}>
                {user?.displayName || 'Loading...'} {/* Mostrar "Loading..." mientras se obtienen los datos */}
              </Typography>

            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} className='Box'simplebar-content-wrapper/>

      <Box sx={{ flexGrow: 1 }} className='Box' />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#00305A',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH,
            bgcolor: '#00305A', // Cambia al color azul el fondo
            borderRightStyle: 'dashed',
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

