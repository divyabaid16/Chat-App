import React, { createContext, useState, useContext } from 'react';
import { getAuthToken, handleLogout } from '../util';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const authToken = getAuthToken();
    return !!authToken;
  });

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    handleLogout()
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
