import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TaglineScreen({ navigation }) {
  const [tagline, setTagline] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSaveDetails = async () => {
    try {
      // Save the tagline and organization name to AsyncStorage
      await AsyncStorage.multiSet([['tagline', tagline], ['organization', organization]]);
      // Navigate to the main app screen
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error saving details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome! Please add your tagline and organization name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tagline"
        value={tagline}
        onChangeText={setTagline}
      />
      <TextInput
        style={styles.input}
        placeholder="Organization Name"
        value={organization}
        onChangeText={setOrganization}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSaveDetails} />
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
