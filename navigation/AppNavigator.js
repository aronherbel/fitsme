import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import OutfitBuilderScreen from '../screens/OutfitBuilderScreen';
import FavoriteOutfitsScreen from '../screens/FavoriteOutfitsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AuthStack from './AuthStack';
import { useUser } from '../context/UserContext';

const Tab = createBottomTabNavigator();
const OutfitStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

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

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen 
        name="SettingsScreen" 
        component={SettingsScreen} 
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
}

// Der Tab-Navigator für authentifizierte Benutzer
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Outfits') {
            iconName = focused ? 'shirt' : 'shirt-outline';
          } else if (route.name === 'Favoriten') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Einstellungen') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff6b6b',
        tabBarInactiveTintColor: '#95a5a6',
        tabBarStyle: {
          height: 65,
          paddingTop: 5,
          paddingBottom: 0,
          position: 'absolute',
          borderTopWidth: 0,
          backgroundColor: '#ffff',
          bottom: 0,
          left: 20,
          right: 20,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          borderRadius: 15,
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 10,
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
      <Tab.Screen 
        name="Einstellungen" 
        component={SettingsStackNavigator} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isLoading, isAuthenticated } = useUser();

  // Zeigt Ladebildschirm während Auth überprüft wird
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}); 