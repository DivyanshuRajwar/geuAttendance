import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isAuthenticated based on localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!storedUser);
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
