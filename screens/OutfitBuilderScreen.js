import {Text, View, StyleSheet} from 'react-native';

export default function CreateOutfits() {
  return (
    <View style={styles.container}>
      <Text>Create Outfits</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});