import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { loginUser, resetPassword } from '../util/auth';
import { SafeAreaView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Fehler', 'Bitte geben Sie sowohl E-Mail als auch Passwort ein.');
      return;
    }

    setIsLoading(true);
    const { user, error } = await loginUser(email, password);
    setIsLoading(false);

    if (error) {
      Alert.alert('Anmeldefehler', error);
      return;
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Fehler', 'Bitte geben Sie Ihre E-Mail-Adresse ein, um Ihr Passwort zurückzusetzen.');
      return;
    }

    setIsLoading(true);
    const { success, error } = await resetPassword(email);
    setIsLoading(false);

    if (error) {
      Alert.alert('Fehler', error);
    } else {
      Alert.alert('Erfolg', 'Eine E-Mail zum Zurücksetzen des Passworts wurde an Ihre Adresse gesendet.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>FitsMe</Text>
            <Text style={styles.tagline}>Kreiere deinen perfekten Look</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Text style={styles.label}>E-Mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Deine E-Mail"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            
            <Text style={styles.label}>Passwort</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Dein Passwort"
              secureTextEntry
            />

            <TouchableOpacity 
              style={styles.forgotPassword} 
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Anmelden</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Noch kein Konto?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Registrieren</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  tagline: {
    fontSize: 16,
    color: '#95a5a6',
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 40,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
  },
  input: {
    backgroundColor: '#f5f8fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#ff6b6b',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 10,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 15,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  signupLink: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 