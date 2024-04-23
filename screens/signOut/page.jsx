import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignOutScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      // Clear user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      // Navigate back to the login screen
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Out</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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
});
