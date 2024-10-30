"use client"
import { User } from '@/types/types';
import {createContext} from 'react'

interface AuthContextType {
  isAuthenticated: boolean;
  login: (access_token:string, refresh_token:string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
