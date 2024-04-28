import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'; // Example import for FontAwesome icons

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const USER_KEY = 'user';

  const storeUserData = async userData => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Invalid email format'); // Set error message
    } else {
      setEmailError(''); // Clear error message
    }
  };
  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (email && password) {
      await storeUserData({email, password});
      navigation.navigate('Name');
    } else {
      Alert.alert('Please enter both username and password');
    }
  };

  const validateEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}
      keyboardVerticalOffset={20}>
    
        <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.header}>
        <Image
          source={require('../assets/business.png')}
          style={styles.image}
        />
        <View style={styles.TextBox}>
          <Text style={styles.headerText}>
            Hi, I am Donna. Let's create a account for you
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
            onChangeText={handleEmailChange}
          />
      
        </View>
 
        {emailError !== '' && (
          <View style={styles.emailError}>
            <Icon name="alert-circle" size={16} style={styles.NotifyIcon} />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
           
          )}
      
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
          title="SIGN UP"
          onPress={handleSignUp}
          buttonStyle={{backgroundColor: '#02093B'}} // Change button color here
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.BottomText}>Already having an account?</Text>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}
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
          titleStyle={{marginHorizontal: 20, color: 'black'}}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
 
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
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  errorText: {
    color: 'red', // Display error messages in red
    fontSize: 12,
    paddingLeft:10

   
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
    marginTop:10
  },
  NotifyIcon:{
    color:'red'
  },
  emailError:{
    flexDirection: 'row',
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
    marginTop:80,
    marginBottom:30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
