import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import { logoutUser } from '../util/auth';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile } from 'firebase/auth';
import { auth } from '../util/firebase';

export default function SettingsScreen() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  
  // Username Change States
  const [newUsername, setNewUsername] = useState('');
  const [showUsernameSection, setShowUsernameSection] = useState(false);

  // Password Change States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const { success, error } = await logoutUser();
    setIsLoading(false);
    
    if (error) {
      Alert.alert('Fehler beim Abmelden', error);
    }
  };

  const handleUsernameChange = async () => {
    // Validierung
    if (!newUsername) {
      Alert.alert('Fehler', 'Bitte gib einen neuen Benutzernamen ein.');
      return;
    }

    if (newUsername === user.displayName) {
      Alert.alert('Hinweis', 'Der neue Benutzername ist identisch mit dem aktuellen.');
      return;
    }

    setIsLoading(true);
    try {
      // Benutzernamen aktualisieren
      await updateProfile(auth.currentUser, {
        displayName: newUsername
      });
      
      // Felder zurücksetzen und Erfolg melden
      setNewUsername('');
      setShowUsernameSection(false);
      Alert.alert('Erfolg', 'Dein Benutzername wurde erfolgreich geändert.');
    } catch (error) {
      Alert.alert('Fehler', 'Benutzername konnte nicht geändert werden. Bitte versuche es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    // Validierung
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Alert.alert('Fehler', 'Bitte alle Felder ausfüllen.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Fehler', 'Die neuen Passwörter stimmen nicht überein.');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Fehler', 'Das neue Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }

    setIsLoading(true);
    try {
      // Zuerst Benutzer re-authentifizieren
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Dann Passwort ändern
      await updatePassword(auth.currentUser, newPassword);
      
      // Felder zurücksetzen und Erfolg melden
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setShowPasswordSection(false);
      Alert.alert('Erfolg', 'Dein Passwort wurde erfolgreich geändert.');
    } catch (error) {
      // Fehlerbehandlung
      let errorMessage = 'Ein unbekannter Fehler ist aufgetreten.';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Das aktuelle Passwort ist nicht korrekt.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Zu viele Versuche. Bitte versuche es später noch einmal.';
      }
      
      Alert.alert('Fehler', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{user?.displayName || 'Benutzer'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Username Change Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowUsernameSection(!showUsernameSection)}
          >
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="person-outline" size={24} color="#333" />
              <Text style={styles.sectionTitle}>Benutzername ändern</Text>
            </View>
            <Ionicons 
              name={showUsernameSection ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>

          {showUsernameSection && (
            <View style={styles.passwordSection}>
              <Text style={styles.label}>Neuer Benutzername</Text>
              <TextInput
                style={styles.input}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="Neuen Benutzernamen eingeben"
                defaultValue={user?.displayName || ''}
              />

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleUsernameChange}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Benutzername ändern</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Password Change Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowPasswordSection(!showPasswordSection)}
          >
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#333" />
              <Text style={styles.sectionTitle}>Passwort ändern</Text>
            </View>
            <Ionicons 
              name={showPasswordSection ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#333" 
            />
          </TouchableOpacity>

          {showPasswordSection && (
            <View style={styles.passwordSection}>
              <Text style={styles.label}>Aktuelles Passwort</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Aktuelles Passwort eingeben"
              />

              <Text style={styles.label}>Neues Passwort</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Neues Passwort eingeben"
              />

              <Text style={styles.label}>Neues Passwort bestätigen</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                placeholder="Neues Passwort bestätigen"
              />

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handlePasswordChange}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Passwort ändern</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>Abmelden</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 120, // Extra padding for bottom tab bar
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 10,
  },
  passwordSection: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 