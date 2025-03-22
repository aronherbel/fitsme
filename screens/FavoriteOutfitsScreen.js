import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

export default function FavoriteOutfitsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorite Outfits</Text>
      <View style={styles.content}>
        <Text>Your favorite outfits will appear here</Text>
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
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
