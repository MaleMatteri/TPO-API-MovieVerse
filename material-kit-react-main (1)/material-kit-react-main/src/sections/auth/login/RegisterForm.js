import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import useResponsive from '../../../hooks/useResponsive'; 
import Swal from 'sweetalert2';
import signUp from '../../../api/SingUp.api';// Asegúrate de que el nombre de la función esté correcto
import { set } from 'lodash';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null); 
  const isMobile = useResponsive('down', 'sm');

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError) setNameError(false); 
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
    if (nameSurname) setSurnameError(false); 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let response = await signUp(name, surname, email, password);
      console.log('ESTA ES LA RESPONSE', response);

      if(response.status === 201) {
        navigate("/login"); // Mostrar mensaje de éxito
      } else {
        setError(response.message);
        console.log('ESTE ES EL ERROR: ', response.message);

        if (response.errors) { // hay algún campo que no se completó
          response.errors.forEach((err) => {
            if (err.path === 'name') {
              setNameError(true);
            } else if (err.path === 'surname') {
              setSurnameError(true);
            } else if (err.path === 'email') {
              setEmailError(true);
            } else {
              setPasswordError(true);
            }
          });
        } else if (response.message === 'Email is already in use') {
          setEmailError(true);
        } else if (response.message === 'User Creation was Unsuccessful') {
          setNameError(true);
          setSurnameError(true);
          setEmailError(true);
          setPasswordError(true);
        }
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField 
            name="name" 
            label="Name"
            value={name} 
            onChange={handleNameChange} 
            error={nameError === true && (error === false || error === 'User Creation was Unsuccessful')} 
            helperText={
              nameError === true && error === false // hay algún campo que no se completó y el nombre no esta completo
              ? 'Please complete this field' 
              : nameError === true && error === 'User Creation was Unsuccessful'
              ? 'Incorrect data. Please try again.'
              : ' '} 
            InputProps={{
              style: { color: isMobile ? 'white' : 'black' } 
            }}
            sx={{ borderColor: nameError ? 'red' : '' }}
          />
          <TextField 
            name="surname" 
            label="Surname"
            value={surname} 
            onChange={handleSurnameChange} 
            error={surnameError === true && (error === false || error === 'User Creation was Unsuccessful')}
            helperText={
              surnameError === true && error === false // hay algún campo que no se completó y el apellido no esta completo 
              ? 'Please complete this field' 
              : surnameError === true && error === 'User Creation was Unsuccessful'
              ? 'Incorrect data. Please try again.'
              : ' '} 
            InputProps={{
              style: { color: isMobile ? 'white' : 'black' }
            }}
          />
          <TextField 
            name="email" 
            label="Email address"
            value={email} 
            onChange={handleEmailChange} 
            error={emailError === true && (error === false || error === 'Email is already in use' || error === 'User Creation was Unsuccessful')} 
            helperText={
              emailError === true && error === false // hay algún campo que no se completó y el email no esta completo
              ? 'Please complete this field' 
              : emailError === true && error === 'Email is already in use' 
              ? 'Email is already in use' 
              : emailError === true && error === 'User Creation was Unsuccessful'
              ? 'Incorrect data. Please try again.'
              : ' '}
            InputProps={{
              style: { color: isMobile ? 'white' : 'black' }
            }}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange} 
            error={passwordError === true && (error === false || error === 'User Creation was Unsuccessful')} 
            helperText={
              passwordError === true && error === false // hay algún campo que no se completó y la password no esta completa 
              ? 'Please complete this field' 
              : passwordError === true && error === 'User Creation was Unsuccessful'
              ? 'Incorrect data. Please try again.'
              : ' '} 
            sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            InputProps={{
              style: { color: isMobile ? 'white' : 'black' },
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

        <LoadingButton fullWidth size="large" variant="contained" sx={{ my: 3 }} type='submit'>
          Sign up
        </LoadingButton>
      </form>
    </>
  );
}
