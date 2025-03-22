import { View, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState} from 'react';

import ClothingCarousel from '../ClothingCarousel';

export default function UpperClothing() {
  const [upperClothes, setUpperClothes] = useState([]);

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

  return (
    <View style={styles.container}>
      <ClothingCarousel items={upperClothes} onAddPress={handleAdd}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});
