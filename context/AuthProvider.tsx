"use client"
import { AuthContext } from "@/context/AuthContext"
import React, { useState, ReactNode } from "react";


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (access_token: string, refresh_token: string) => {
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')  
    // En caso de que se desee eliminar toodo lo del localStorage
    // localStorage.clear();
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};