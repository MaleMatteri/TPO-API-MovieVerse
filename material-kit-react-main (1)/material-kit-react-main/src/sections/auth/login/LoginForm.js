import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import useResponsive from '../../../hooks/useResponsive'; // tengo que ver como hacer que diferencie el modo mobile, para cambiar el estilo de sus cuadros de texto.

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false); // Estado para indicar si hay un error en el campo de email
  const [passwordError, setPasswordError] = useState(false); // Estado para indicar si hay un error en el campo de contraseña

  const handleClick = () => {
    if (email.trim() === '' || password.trim() === '') {
      setEmailError(email.trim() === ''); // Establecer el estado de error para el campo de email
      setPasswordError(password.trim() === ''); // Establecer el estado de error para el campo de contraseña
      return;
    }
    // Aquí podrías continuar con el proceso de inicio de sesión
    console.log('Iniciar sesión con:', email, password);
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address"
          value={email} 
          onChange={(e) => { setEmail(e.target.value); setEmailError(false); }} // Limpiar el error cuando se modifica el campo de email
          error={emailError} // Aplicar estilo de error al campo de email si hay un error
          helperText={emailError ? 'Por favor, complete este campo' : ' '} // Espacio reservado para mantener la altura del campo
          InputProps={{
            style: { color: 'white' } // Solo cambiar el color del texto en modo móvil
          }}
        />


        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => { setPassword(e.target.value); setPasswordError(false); }} // Limpiar el error cuando se modifica el campo de contraseña
          error={passwordError} // Aplicar estilo de error al campo de contraseña si hay un error
          helperText={passwordError ? 'Por favor, complete este campo' : ' '} // Espacio reservado para mantener la altura del campo
          sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} // Evitar que el texto se divida y mostrar puntos suspensivos si no cabe en el campo
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}