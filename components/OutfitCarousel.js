import React, { useRef } from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;

export default function OutfitCarousel({ outfits, onRemovePress }) {
  const flatListRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.outfitContainer}>
          {/* Oberteil */}
          <View style={styles.clothingItemContainer}>
            <Image source={{ uri: item.upperClothing.uri }} style={styles.image} resizeMode="cover" />
          </View>
          
          {/* Hose */}
          <View style={styles.clothingItemContainer}>
            <Image source={{ uri: item.trousers.uri }} style={styles.image} resizeMode="cover" />
          </View>
          
          {/* Schuhe */}
          <View style={styles.clothingItemContainer}>
            <Image source={{ uri: item.shoes.uri }} style={styles.image} resizeMode="cover" />
          </View>
          
          {/* Löschen-Button */}
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onRemovePress && onRemovePress(item.id)}
          >
            <Ionicons name="close-circle" size={28} color="#e74c3c" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (outfits.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Keine Favoriten-Outfits vorhanden</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={outfits}
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 560,
    marginVertical: 10,
    width: width,
  },
  emptyContainer: {
    height: 560,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
  },
  itemContainer: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outfitContainer: {
    position: 'relative',
    width: width * 0.85,
    height: 540,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 15,
    justifyContent: 'space-between',
  },
  clothingItemContainer: {
    width: '100%',
    height: 170,
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 5,
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
}); 