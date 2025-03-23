import React, { createContext, useState, useContext } from 'react';

// Context erstellen
export const FavoriteOutfitsContext = createContext();

// Hook für einfacheren Zugriff auf den Kontext
export const useFavoriteOutfits = () => useContext(FavoriteOutfitsContext);

// Context Provider
export const FavoriteOutfitsProvider = ({ children }) => {
  const [favoriteOutfits, setFavoriteOutfits] = useState([]);

  // Outfit zu Favoriten hinzufügen
  const addFavoriteOutfit = (upperClothing, trousers, shoes) => {
    // Sicherstellen, dass alle erforderlichen Bilder vorhanden sind
    if (!upperClothing || !trousers || !shoes) {
      console.error('Alle Kleidungsstücke müssen ausgewählt sein, um ein Outfit zu favorisieren');
      return false;
    }

    const newOutfit = {
      id: Date.now().toString(), // Eindeutige ID basierend auf Zeitstempel
      upperClothing,
      trousers,
      shoes,
      createdAt: new Date(),
    };

    setFavoriteOutfits(prevOutfits => [...prevOutfits, newOutfit]);
    return true;
  };

  // Outfit aus Favoriten entfernen
  const removeFavoriteOutfit = (outfitId) => {
    setFavoriteOutfits(prevOutfits => 
      prevOutfits.filter(outfit => outfit.id !== outfitId)
    );
  };

  // Prüfen, ob alle Kleidungsstücke ausgewählt sind
  const canCreateFavorite = (upperClothing, trousers, shoes) => {
    return !!upperClothing && !!trousers && !!shoes;
  };

  // Werte, die dem Context zur Verfügung gestellt werden
  const value = {
    favoriteOutfits,
    addFavoriteOutfit,
    removeFavoriteOutfit,
    canCreateFavorite
  };

  return (
    <FavoriteOutfitsContext.Provider value={value}>
      {children}
    </FavoriteOutfitsContext.Provider>
  );
}; 