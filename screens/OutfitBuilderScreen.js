import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import UpperClothing from '../components/clothes/UpperClothing';
import Trousers from '../components/clothes/Trousers';
import Shoes from '../components/clothes/Shoes';

export default function CreateOutfits() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Outfits</Text>
      <View style={styles.clothingContainer}>
        <UpperClothing />
        <Trousers />
        <Shoes />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 2
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  clothingContainer: {
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 0,
  },
});
