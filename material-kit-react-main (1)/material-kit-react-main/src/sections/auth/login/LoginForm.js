import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import useResponsive from '../../../hooks/useResponsive';
import login from '../../../api/Login.api';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useResponsive('down', 'sm');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(false); // Reset email error
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(false); // Reset password error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      let response = await login(email, password);
      console.log('ESTA ES LA RESPONSE', response);

      if (response.status === 200) {
        sessionStorage.setItem("access-token", response.token);
        navigate("/dashboard/app");
      } else {
        setError(response.message);
        console.log('ESTE ES EL ERROR: ', response.message);
        
        if (response.errors) {
          response.errors.forEach(err => {
            if (err.path === 'email') {
              setEmailError(true);
            } else if (err.path === 'password') {
              setPasswordError(true);
            }
          });
        } else if (response.message === 'Invalid username or password') {
          setEmailError(true);
          setPasswordError(true);
        } else if (response.message === 'Invalid password') {
          setPasswordError(true);
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField 
            name="email" 
            label="Email address"
            value={email} 
            onChange={handleEmailChange}
            error={emailError === true && (error === false || error === 'Invalid username or password')}
            helperText={
              error === false && emailError === true // hay algún campo que no se completó y el email no esta completo
                ? 'Please enter your email'
                : error === 'Invalid username or password' && emailError === true // el email no es correcto
                ? 'Incorrect email'
                : ' '
            }
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
            error={passwordError === true && (error === false || error === 'Invalid username or password' || error === 'Invalid password')}
            helperText={
              error === false && passwordError === true // hay algún campo que no se completó y el password no esta completo
                ? 'Please enter your password'
                : (error === 'Invalid password' || error === 'Invalid username or password') && passwordError === true // la password no es correcta
                ? 'Incorrect password'
                : ' '
            }
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
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>  

        <LoadingButton fullWidth size="large" variant="contained" type="submit">
          Login
        </LoadingButton>
      </form>
    </>
  );
}