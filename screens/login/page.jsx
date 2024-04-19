import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Indicates if we're still checking the authentication status

  const USER_KEY = 'user';

  useEffect(() => {
    checkAuthentication(); // Check authentication status when component mounts
  }, []);

  const checkAuthentication = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      if (userData) {
        // If user data exists in AsyncStorage, navigate to the Home screen
        console.log('userData',userData)
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    } finally {
      setLoading(false); // Finished checking authentication status
    }
  };

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.username === username && parsedUserData.password === password) {
          navigation.navigate('Home');
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('No user found. Please sign up.');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingLeft: 8,
  },
});
