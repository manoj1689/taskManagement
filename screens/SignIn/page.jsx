import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
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
        console.log('userData', userData);
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
      if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      const userData = await AsyncStorage.getItem(USER_KEY);
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.email === email && parsedUserData.password === password) {
          navigation.navigate('Home');
        } else {
          Alert.alert('Invalid credentials');
        }
      } else {
        Alert.alert('No user found. Please sign up.');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
      Alert.alert('An error occurred. Please try again.');
    }
  };

  const validateEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/business.png')}
          style={styles.image}
        />
        <View style={styles.TextBox}>
          <Text style={styles.headerText}>
            Hi, Welocme back to Donna. Let's Login
          </Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Icon
            name="mail"
            type="font-awesome"
            size={22}
            style={styles.iconContainer}
          />
          <TextInput
            style={styles.input}
            placeholder="Email id"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="briefcase"
            type="font-awesome"
            size={22}
            style={styles.iconContainer}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="LOGIN"
          onPress={handleLogin}
          buttonStyle={{ backgroundColor: '#02093B' }} // Change button color here
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.BottomText}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
          raised
          buttonStyle={{
            backgroundColor: '#ffff',
            borderRadius: 3,
          }}
          containerStyle={{
            height: 40,
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ marginHorizontal: 20, color: 'black' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  header: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  TextBox: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: 'black',
  },
  BottomText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
  form: {
    width: '85%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#AEAEAE',
    padding: 9,
    borderRightWidth: 2, // Adjust the width as needed
    borderRightColor: '#AEAEAE',
    backgroundColor: '#e6e6e6',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 2,
    borderColor: '#e6e6e6',
    backgroundColor: '#e6e6e6',
    paddingLeft: 8,
  },
  buttonContainer: {
    width: '85%',
    marginTop: 16,
    backgroundColor: 'green',
  },
  bottom: {
    flex: 3,
    marginBottom: 50, // Set margin bottom here
    paddingVertical: 10, // Optional: Add padding for better appearance
    justifyContent: 'center',
    alignItems: 'center',
  },
});
