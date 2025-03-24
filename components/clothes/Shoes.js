import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

import ClothingCarousel from '../ClothingCarousel';

export default function Shoes(props) {
  const [shoes, setShoes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Wenn sich das ausgewählte Element ändert, benachrichtige die Eltern-Komponente
  useEffect(() => {
    if (props.onSelectedItemChange && shoes.length > 0 && selectedIndex < shoes.length) {
      props.onSelectedItemChange(shoes[selectedIndex]);
    } else if (props.onSelectedItemChange) {
      props.onSelectedItemChange(null);
    }
  }, [selectedIndex, shoes, props.onSelectedItemChange]);

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
      setShoes((prev) => [...prev, { uri }]);
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
      setShoes((prev) => [...prev, { uri }]);
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
      'Möchtest du diese Schuhe wirklich löschen?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        { 
          text: 'Löschen', 
          style: 'destructive',
          onPress: () => {
            const newShoes = [...shoes];
            newShoes.splice(index, 1);
            setShoes(newShoes);
            
            // Wenn das aktuell gewählte Element gelöscht wurde
            if (index === selectedIndex) {
              if (newShoes.length > 0) {
                // Wähle das vorherige Element oder das erste Element
                setSelectedIndex(Math.min(index, newShoes.length - 1));
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
    if (index < shoes.length) {
      setSelectedIndex(index);
      // Sofort die aktuelle Auswahl aktualisieren, nicht auf den useEffect warten
      if (props.onSelectedItemChange) {
        props.onSelectedItemChange(shoes[index]);
      }
    } else {
      // Wenn der Index auf den "Add Button" zeigt (letztes Element), setze die Auswahl auf null
      if (props.onSelectedItemChange) {
        props.onSelectedItemChange(null);
      }
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <ClothingCarousel 
        items={shoes} 
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
