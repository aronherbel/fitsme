import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import UpperClothing from '../components/clothes/UpperClothing';
import Trousers from '../components/clothes/Trousers';
import Shoes from '../components/clothes/Shoes';

export default function CreateOutfits() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Outfits</Text>
      <View style={styles.clothingContainer}>
        <UpperClothing />
        <Trousers style={styles.middleComponent} />
        <Shoes />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  clothingContainer: {
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 0,
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  middleComponent: {
    marginVertical: 10,
  },
});
