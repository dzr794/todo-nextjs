// components/LoginForm.tsx

"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/useAuth';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const {login} = useAuth()
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Send login credentials to the API
    const response = await axios.post('http://localhost:3000/auth/local/signin', {
      email,
      password,
    });

    console.log(response.data);
    
    // Save the JWT token to localStorage
    const access_token = response.data.access_token;
    const refresh_token = response.data.refresh_token;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    login(access_token, refresh_token);
    
    // Redirect to a protected page or homepage after successful login
    router.push('/tasks');

  };

  return (
    <Container sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <Paper elevation={3} sx={{minHeight:300, borderRadius:2, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', p:2}}>
        <Stack spacing={2}>
          <Typography variant="h4" color='#fff'>Login</Typography>

          <Box component='form' onSubmit={handleLogin} sx={{ }}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginForm;
