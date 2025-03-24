import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../util/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Context erstellen
export const UserContext = createContext();

// Hook für einfacheren Zugriff auf den Kontext
export const useUser = () => useContext(UserContext);

// Context Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Überwacht den Auth-Status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    // Cleanup-Funktion
    return () => unsubscribe();
  }, []);

  // Werte, die dem Context zur Verfügung gestellt werden
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 