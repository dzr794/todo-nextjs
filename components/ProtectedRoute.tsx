"use client";
import { useAuth } from '@/context/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let active = true;
    refreshToken()
    return () => {
      active = false;
    };

    async function refreshToken() {
    
        const refresh_token = localStorage.getItem('refresh_token');
        console.log('REFRESH TOKEN = ', refresh_token);
        
        if (refresh_token == null) 
          router.push('/');
        
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/auth/refresh',
          headers: { 
            'Authorization': `Bearer ${refresh_token}`
          }
        };

        axios.request(config)
        .then((response) => {
          const access_token = response.data.access_token;
          const refresh_token = response.data.refresh_token;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          
        })
        .catch((error) => {
          console.log(error);
        });

        
    }
  }, [isAuthenticated, router]);

  return children;
};


export default ProtectedRoute;