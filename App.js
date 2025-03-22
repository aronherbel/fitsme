import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OutfitBuilderScreen from './screens/OutfitBuilderScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <OutfitBuilderScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
