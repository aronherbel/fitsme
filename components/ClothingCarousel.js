import React, { useRef, useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;

export default function ClothingCarousel({ items, onAddPress, onDeletePress, onItemChange }) {
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Wenn sich der aktive Index ändert, benachrichtige die Eltern-Komponente
  useEffect(() => {
    if (onItemChange && activeIndex < items.length) {
      onItemChange(activeIndex);
    }
  }, [activeIndex, items, onItemChange]);

  const renderItem = ({ item, index }) => {
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
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onDeletePress && onDeletePress(index)}
          >
            <Ionicons name="close-circle" size={28} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  // Aktuellen Index beim Scrollen aktualisieren
  const handleScroll = (event) => {
    const slideWidth = width;
    const offset = event.nativeEvent.contentOffset.x;
    const activeIndex = Math.floor(offset / slideWidth);
    
    if (activeIndex < items.length) {
      setActiveIndex(activeIndex);
      // Sofort die Änderung an die übergeordnete Komponente weitergeben
      if (onItemChange) {
        onItemChange(activeIndex);
      }
    }
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
        onMomentumScrollEnd={handleScroll}
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
  imageContainer: {
    position: 'relative',
    width: width * 0.7,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 3,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
