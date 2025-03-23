import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './navigation/AppNavigator';
import { UserProvider } from './context/UserContext';
import { FavoriteOutfitsProvider } from './context/FavoriteOutfitsContext';

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <FavoriteOutfitsProvider>
          <Navigator />
        </FavoriteOutfitsProvider>
      </UserProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
