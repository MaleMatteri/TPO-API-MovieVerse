import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import useResponsive from '../../../hooks/useResponsive'; 

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [you_name, setYou_Name] = useState('');
  const [you_surname, setYou_Surname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [you_NameError, setYou_NameError] = useState(false);
  const [you_SurnameError, setYou_SurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false); // Estado para indicar si hay un error en el campo de email
  const [passwordError, setPasswordError] = useState(false); // Estado para indicar si hay un error en el campo de contraseña
  const [you_NameSuccess, setYou_NameSuccess] = useState(false); // Estado de éxito para el campo de nombre
  const [you_SurnameSuccess, setYou_SurnameSuccess] = useState(false); // Estado de éxito para el campo de apellido
  const [emailSuccess, setEmailSuccess] = useState(false); // Estado de éxito para el campo de email
  const [passwordSuccess, setPasswordSuccess] = useState(false); // Estado de éxito para el campo de contraseña


  const isMobile = useResponsive('down', 'sm'); // Check if the device is mobile

  const handleClick = () => {
    if (you_name.trim() === '' || you_surname.trim() === '' || email.trim() === '' || password.trim() === '') {
      setYou_NameError(you_name.trim() === '');
      setYou_SurnameError(you_surname.trim() === '');
      setEmailError(email.trim() === ''); // Establecer el estado de error para el campo de email
      setPasswordError(password.trim() === ''); // Establecer el estado de error para el campo de contraseña
      return;
    }
      setYou_NameError(false);
      setYou_SurnameError(false);
      setEmailError(false); 
      setPasswordError(false); 
      setYou_NameSuccess(true); // Establecer el estado de éxito en true cuando todos los campos estén llenos
      setYou_SurnameSuccess(true); 
      setEmailSuccess(true); 
      setPasswordSuccess(true); 
  };

  const handleClick_Login = () => {
    console.log('Iniciar sesión con:', email, password);
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Stack spacing={2}>
      <TextField 
          name="you_name" 
          label="Name"
          value={you_name} 
          onChange={(e) => { setYou_Name(e.target.value); setYou_NameError(false); }} // Limpiar el error cuando se modifica el campo de email
          error={you_NameError} // Aplicar estilo de error al campo de email si hay un error
          helperText={you_NameError ? 'Por favor, complete este campo' : ' '} // Espacio reservado para mantener la altura del campo
          InputProps={{
            style: { color: isMobile ? 'white' : 'black' } // Change text color based on mobile mode
          }}
          sx={{ borderColor: you_NameSuccess ? 'green' : '' }}
        />
        <TextField 
          name="you_surname" 
          label="Surname"
          value={you_surname} 
          onChange={(e) => { setYou_Surname(e.target.value); setYou_SurnameError(false); }} // Limpiar el error cuando se modifica el campo de email
          error={you_SurnameError} // Aplicar estilo de error al campo de email si hay un error
          helperText={you_SurnameError ? 'Por favor, complete este campo' : ' '} // Espacio reservado para mantener la altura del campo
          InputProps={{
            style: { color: isMobile ? 'white' : 'black' } // Change text color based on mobile mode
          }}
        />
        <TextField 
          name="email" 
          label="Email address"
          value={email} 
          onChange={(e) => { setEmail(e.target.value); setEmailError(false); }} // Limpiar el error cuando se modifica el campo de email
          error={emailError} // Aplicar estilo de error al campo de email si hay un error
          helperText={emailError ? 'Por favor, complete este campo' : ' '} // Espacio reservado para mantener la altura del campo
          InputProps={{
            style: { color: isMobile ? 'white' : 'black' } // Change text color based on mobile mode
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
            style: { color: isMobile ? 'white' : 'black' }, // Change text color based on mobile mode
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

      <LoadingButton fullWidth size="large" variant="contained" sx={{ my: 3 }} onClick={handleClick}>
        Sing up
      </LoadingButton>

      <LoadingButton fullWidth size="large" variant="contained" sx={{ my: 1 }} onClick={handleClick_Login}>
        Login
      </LoadingButton>
    </>
  );
}