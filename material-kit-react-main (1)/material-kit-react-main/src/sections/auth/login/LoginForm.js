import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrorType, setLoginErrorType] = useState(null);
  const isMobile = useResponsive('down', 'sm');

  const HARDCODED_USERNAME = 'example@example.com';
  const HARDCODED_PASSWORD = '1234';

  const handleClick = () => {
    if (email === '' || password === '') {
      // If fields are empty, set loginErrorType to 'empty'
      setLoginErrorType('empty');
      return;
    }

    if (email !== HARDCODED_USERNAME || password !== HARDCODED_PASSWORD) {
      // If credentials are incorrect, set loginErrorType to 'incorrect'
      setLoginErrorType('incorrect');
      return;
    }

    // If credentials are correct, navigate to the dashboard page
    navigate('/dashboard/app', { replace: true });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address"
          value={email} 
          onChange={(e) => { setEmail(e.target.value); setLoginErrorType(null); }}
          error={loginErrorType === 'empty' || loginErrorType === 'incorrect'}
          helperText={
            loginErrorType === 'empty'
              ? 'Please enter your email'
              : loginErrorType === 'incorrect'
              ? 'Incorrect email or password'
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
          onChange={(e) => { setPassword(e.target.value); setLoginErrorType(null); }}
          error={loginErrorType === 'empty' || loginErrorType === 'incorrect'}
          helperText={
            loginErrorType === 'empty'
              ? 'Please enter your password'
              : loginErrorType === 'incorrect'
              ? 'Incorrect email or password'
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
