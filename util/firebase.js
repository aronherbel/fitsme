import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Ihre Firebase-Konfiguration
// HINWEIS: Sie müssen diese mit Ihren eigenen Daten aus der Firebase Console ersetzen
const firebaseConfig = {
  apiKey: "AIzaSyCJLFWVLzYHUMgUzJZ8qaYsxsOgRtiLKlA",
  authDomain: "fitsme-7d6b0.firebaseapp.com",
  projectId: "fitsme-7d6b0",
  storageBucket: "fitsme-7d6b0.firebasestorage.app",
  messagingSenderId: "176082794074",
  appId: "1:176082794074:web:21f08ebd8d9e22f5f3ca63",
  measurementId: "G-7QVCX9JPET"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Auth mit persistenter Sitzung initialisieren
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
export default app; 