import React, { useRef } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;

export default function ClothingCarousel({ items, onAddPress }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => {
    if (item.isAddButton) {
      return (
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
            <Ionicons name="add" size={40} color="gray" />
          </TouchableOpacity>
        </View>
      );
    }
    
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={[...items, { isAddButton: true }]}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={items.length === 0 ? styles.emptyListContent : null}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    marginVertical: 2,
    width: width,
  },
  emptyListContent: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  addButton: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});
