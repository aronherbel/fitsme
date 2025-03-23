import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import UpperClothing from '../components/clothes/UpperClothing';
import Trousers from '../components/clothes/Trousers';
import Shoes from '../components/clothes/Shoes';
import { useFavoriteOutfits } from '../context/FavoriteOutfitsContext';

export default function CreateOutfits() {
  const [currentUpperClothing, setCurrentUpperClothing] = useState(null);
  const [currentTrousers, setCurrentTrousers] = useState(null);
  const [currentShoes, setCurrentShoes] = useState(null);
  
  const { addFavoriteOutfit, canCreateFavorite } = useFavoriteOutfits();
  
  // Prüfen, ob der Favoriten-Button angezeigt werden soll
  const showFavoriteButton = currentUpperClothing && currentTrousers && currentShoes;
  
  // Aktuelle Auswahl der Kleidungsstücke aktualisieren
  const handleUpperClothingChange = useCallback((item) => {
    setCurrentUpperClothing(item);
  }, []);
  
  const handleTrousersChange = useCallback((item) => {
    setCurrentTrousers(item);
  }, []);
  
  const handleShoesChange = useCallback((item) => {
    setCurrentShoes(item);
  }, []);
  
  // Outfit als Favorit speichern
  const handleAddToFavorites = () => {
    // Prüfen, ob wirklich alle Kleidungsstücke ausgewählt sind
    if (!currentUpperClothing || !currentTrousers || !currentShoes) {
      Alert.alert(
        'Unvollständiges Outfit',
        'Bitte wähle für jede Kategorie ein Kleidungsstück aus.'
      );
      return;
    }

    // Tiefe Kopien der aktuellen Kleidungsstücke erstellen, um sicherzustellen,
    // dass wir die tatsächlichen Bilder speichern
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
            <Ionicons name="heart" size={24} color="#ff6b6b" />
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
    padding: 8,
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
