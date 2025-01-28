import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = useCallback(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('UserContext - User authenticated:', parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [checkAuth]);

  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('userProfile', JSON.stringify(userData));
    console.log('UserContext - User logged in:', userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('userProfile');
    console.log('UserContext - User logged out');
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!localStorage.getItem('userProfile');
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, checkAuth, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

