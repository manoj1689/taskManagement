import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleNext = async () => {
    try {
      // Save the name to AsyncStorage
      await AsyncStorage.setItem('name', name);
      // Navigate to the next screen
      navigation.navigate('Tagline');
    } catch (error) {
      console.error('Error saving name:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome! Please enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
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
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    paddingLeft: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust this value as needed
    width: '100%',
    paddingHorizontal: 20,
  },
});
