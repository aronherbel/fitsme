import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useFavoriteOutfits } from '../context/FavoriteOutfitsContext';
import OutfitCarousel from '../components/OutfitCarousel';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteOutfitsScreen() {
  const { favoriteOutfits, removeFavoriteOutfit } = useFavoriteOutfits();
  
  // Outfit aus den Favoriten entfernen
  const handleRemoveFavorite = (outfitId) => {
    Alert.alert(
      'Outfit entfernen',
      'Möchtest du dieses Outfit wirklich aus deinen Favoriten entfernen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Entfernen', 
          style: 'destructive',
          onPress: () => {
            removeFavoriteOutfit(outfitId);
          } 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Outfits</Text>
      
      {favoriteOutfits.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Keine Favoriten-Outfits vorhanden</Text>
          <Text style={styles.emptySubtext}>
            Erstelle Outfits und markiere sie als Favoriten,
            um sie hier zu sehen
          </Text>
        </View>
      ) : (
        <View style={styles.content}>
          <OutfitCarousel 
            outfits={favoriteOutfits}
            onRemovePress={handleRemoveFavorite}
          />
        </View>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 24,
  },
});
