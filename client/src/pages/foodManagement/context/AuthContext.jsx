import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error("Failed to decode token", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const user = getUserFromToken();
    if (user) {
      setAuthState({
        isAuthenticated: true,
        user,
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token); // Decode the token to get user data
      setAuthState({
        isAuthenticated: true,
        decodedUser,
      });
    }
  }, []);

  const login = (token) => {
    const decodedUser = jwtDecode(token); // Decode the token to get user data
    localStorage.setItem('token', token);
    setAuthState({
      isAuthenticated: true,
      decodedUser,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout,user: getUserFromToken() }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
