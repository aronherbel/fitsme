import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

import ClothingCarousel from '../ClothingCarousel';

export default function UpperClothing(props) {
  const [upperClothes, setUpperClothes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Wenn sich das ausgewählte Element ändert, benachrichtige die Eltern-Komponente
  useEffect(() => {
    if (props.onSelectedItemChange && upperClothes.length > 0 && selectedIndex < upperClothes.length) {
      props.onSelectedItemChange(upperClothes[selectedIndex]);
    } else if (props.onSelectedItemChange) {
      props.onSelectedItemChange(null);
    }
  }, [selectedIndex, upperClothes, props.onSelectedItemChange]);

  // Bild auswählen (Galerie)
  const pickImageAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Wir brauchen Galerie-Zugriff!');
          return;
        }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUpperClothes((prev) => [...prev, { uri }]);
      console.log("Bild hinzugefügt:", uri);
      // Später: Upload zu Firebase hier
    } else {
      alert('Du hast kein Bild ausgewählt.');
    }
  };

  // Optional Kamera
  const openCameraAsync = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Wir brauchen Kamera-Zugriff!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUpperClothes((prev) => [...prev, { uri }]);
      console.log("Bild aufgenommen:", uri);
      // Später Firebase Upload hier
    }
  };

  // Auswahl-Dialog
  const handleAdd = () => {
    Alert.alert(
      'Bild hinzufügen',
      'Wähle eine Option',
      [
        { text: 'Kamera', onPress: openCameraAsync },
        { text: 'Galerie', onPress: pickImageAsync },
        { text: 'Abbrechen', style: 'cancel' },
      ]
    );
  };

  // Bild löschen
  const handleDelete = (index) => {
    Alert.alert(
      'Bild löschen',
      'Möchtest du dieses Kleidungsstück wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Löschen', 
          style: 'destructive',
          onPress: () => {
            const newClothes = [...upperClothes];
            newClothes.splice(index, 1);
            setUpperClothes(newClothes);
            
            // Wenn das aktuell gewählte Element gelöscht wurde
            if (index === selectedIndex) {
              if (newClothes.length > 0) {
                // Wähle das vorherige Element oder das erste Element
                setSelectedIndex(Math.min(index, newClothes.length - 1));
              } else {
                setSelectedIndex(0);
              }
            } else if (index < selectedIndex) {
              // Wenn ein Element vor dem ausgewählten Element gelöscht wurde, passe den Index an
              setSelectedIndex(selectedIndex - 1);
            }
          } 
        },
      ]
    );
  };
  
  // Aktuelles Element verfolgen, wenn durch die Bilder gewischt wird
  const handleScroll = (index) => {
    if (index < upperClothes.length) {
      setSelectedIndex(index);
      // Sofort die aktuelle Auswahl aktualisieren, nicht auf den useEffect warten
      if (props.onSelectedItemChange && upperClothes.length > 0) {
        props.onSelectedItemChange(upperClothes[index]);
      }
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <ClothingCarousel 
        items={upperClothes} 
        onAddPress={handleAdd}
        onDeletePress={handleDelete}
        onItemChange={handleScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
