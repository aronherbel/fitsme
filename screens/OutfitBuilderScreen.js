import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import UpperClothing from '../components/clothes/UpperClothing';
import Trousers from '../components/clothes/Trousers';
import Shoes from '../components/clothes/Shoes';
import { useFavoriteOutfits } from '../context/FavoriteOutfitsContext';

export default function CreateOutfits() {
  const [currentUpperClothing, setCurrentUpperClothing] = useState(null);
  const [currentTrousers, setCurrentTrousers] = useState(null);
  const [currentShoes, setCurrentShoes] = useState(null);
  const [showFavoriteButton, setShowFavoriteButton] = useState(false);
  const [isAlreadyFavorite, setIsAlreadyFavorite] = useState(false);
  
  const { addFavoriteOutfit, favoriteOutfits, canCreateFavorite } = useFavoriteOutfits();
  
  // Überprüft, ob alle drei Kleidungsstücke ausgewählt sind und aktualisiert den Button-Status
  useEffect(() => {
    // Prüfe, ob alle benötigten Elemente vorhanden sind und eine URI haben
    const hasValidUpper = currentUpperClothing && currentUpperClothing.uri;
    const hasValidTrousers = currentTrousers && currentTrousers.uri;
    const hasValidShoes = currentShoes && currentShoes.uri;
    
    // Nur wenn alle drei gültig sind, zeige den Button an
    setShowFavoriteButton(hasValidUpper && hasValidTrousers && hasValidShoes);
    
    // Prüfe, ob das aktuelle Outfit bereits als Favorit markiert ist
    if (hasValidUpper && hasValidTrousers && hasValidShoes) {
      const isExistingFavorite = favoriteOutfits.some(outfit => 
        outfit.upperClothing.uri === currentUpperClothing.uri &&
        outfit.trousers.uri === currentTrousers.uri &&
        outfit.shoes.uri === currentShoes.uri
      );
      
      setIsAlreadyFavorite(isExistingFavorite);
      console.log("Outfit bereits favorisiert:", isExistingFavorite);
    } else {
      setIsAlreadyFavorite(false);
    }
    
    // Debug-Ausgabe
    console.log("Outfit-Status:", { 
      upper: hasValidUpper ? "✓" : "✗", 
      trousers: hasValidTrousers ? "✓" : "✗", 
      shoes: hasValidShoes ? "✓" : "✗"
    });
  }, [currentUpperClothing, currentTrousers, currentShoes, favoriteOutfits]);
  
  // Aktuelle Auswahl der Kleidungsstücke aktualisieren
  const handleUpperClothingChange = useCallback((item) => {
    console.log("Oberteil geändert:", item ? "Vorhanden" : "Leer");
    setCurrentUpperClothing(item);
  }, []);
  
  const handleTrousersChange = useCallback((item) => {
    console.log("Hose geändert:", item ? "Vorhanden" : "Leer");
    setCurrentTrousers(item);
  }, []);
  
  const handleShoesChange = useCallback((item) => {
    console.log("Schuhe geändert:", item ? "Vorhanden" : "Leer");
    setCurrentShoes(item);
  }, []);
  
  // Outfit als Favorit speichern
  const handleAddToFavorites = () => {
    // Erneut prüfen, ob wirklich alle Kleidungsstücke ausgewählt sind
    if (!currentUpperClothing?.uri || !currentTrousers?.uri || !currentShoes?.uri) {
      Alert.alert(
        'Unvollständiges Outfit',
        'Bitte wähle für jede Kategorie ein Kleidungsstück aus.'
      );
      return;
    }

    // Wenn das Outfit bereits ein Favorit ist, benachrichtige den Benutzer
    if (isAlreadyFavorite) {
      Alert.alert(
        'Bereits favorisiert',
        'Dieses Outfit ist bereits in deinen Favoriten gespeichert.'
      );
      return;
    }

    // Tiefe Kopien der aktuellen Kleidungsstücke erstellen
    const upperToSave = { ...currentUpperClothing };
    const trousersToSave = { ...currentTrousers };
    const shoesToSave = { ...currentShoes };

    console.log('Speichere Outfit:', {
      upper: upperToSave.uri,
      trousers: trousersToSave.uri,
      shoes: shoesToSave.uri
    });

    const success = addFavoriteOutfit(upperToSave, trousersToSave, shoesToSave);
    
    if (success) {
      setIsAlreadyFavorite(true);
      Alert.alert(
        'Outfit gespeichert',
        'Das Outfit wurde zu deinen Favoriten hinzugefügt!'
      );
    } else {
      Alert.alert(
        'Fehler',
        'Das Outfit konnte nicht gespeichert werden.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Create Outfits</Text>
        {showFavoriteButton && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={handleAddToFavorites}
          >
            <Ionicons 
              name={isAlreadyFavorite ? "heart" : "heart-outline"} 
              size={30} 
              color="#ff6b6b" 
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.clothingContainer}>
        <UpperClothing 
          onSelectedItemChange={handleUpperClothingChange} 
        />
        <Trousers 
          style={styles.middleComponent} 
          onSelectedItemChange={handleTrousersChange}
        />
        <Shoes 
          onSelectedItemChange={handleShoesChange} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    paddingBottom: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    right: 20,
    padding: 10,
  },
  clothingContainer: {
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
});
