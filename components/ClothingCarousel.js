import React from "react";
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ClothingCarousel({ items, onAddPress}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...items, { isAddButton: true }]}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) =>
          item.isAddButton ? (
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
              <Ionicons name="add" size={40} color="gray" />
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: item.uri }} style={styles.image} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190, // Reduziert von 250
    marginVertical: 2, // Minimaler vertikaler Abstand
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: 2, // Reduziert von 5
  },
  image: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    backgroundColor: "#eee",
    marginHorizontal: 2, // Reduziert von 5
  },
  addButton: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2, // Reduziert von 5
  },
});
