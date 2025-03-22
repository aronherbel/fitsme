import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import OutfitBuilderScreen from '../screens/OutfitBuilderScreen';
import FavoriteOutfitsScreen from '../screens/FavoriteOutfitsScreen';

const Tab = createBottomTabNavigator();
const OutfitStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

function OutfitStackNavigator() {
  return (
    <OutfitStack.Navigator>
      <OutfitStack.Screen 
        name="OutfitBuilder" 
        component={OutfitBuilderScreen} 
        options={{ headerShown: false }}
      />
    </OutfitStack.Navigator>
  );
}

function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen 
        name="Favorites" 
        component={FavoriteOutfitsScreen} 
        options={{ headerShown: false }}
      />
    </FavoritesStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Outfits') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            } else if (route.name === 'Favoriten') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6b6b',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: {
            height: 60,
            paddingTop: 5,
            paddingBottom: 10,
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            backgroundColor: '#ffff',
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 5,
            borderRadius: 15,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            paddingBottom: 3,
          },
        })}
      >
        <Tab.Screen 
          name="Outfits" 
          component={OutfitStackNavigator} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Favoriten" 
          component={FavoritesStackNavigator} 
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 