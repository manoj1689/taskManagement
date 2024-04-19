// SignUpScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'; // Example import for FontAwesome icons

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const USER_KEY = 'user';

  const storeUserData = async userData => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const handleSignUp = async () => {
    if (username && password) {
      await storeUserData({username, password});
      navigation.navigate('Name');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
              name='mail'
              type='font-awesome'
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
              type='font-awesome'
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
          onPress={() => navigation.navigate('Login')}
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
    marginTop:50,
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
  BottomText:{
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
  justifyContent:'center',
  alignItems:'center',
  color:'#AEAEAE',
  padding:9,
  borderRightWidth: 2, // Adjust the width as needed
  borderRightColor: '#AEAEAE', 
 backgroundColor:'#e6e6e6'

  },
  input: {
    flex: 1,
    height: 40,
    borderWidth:2,
    color:'#AEAEAE',
    borderColor: '#e6e6e6',
    backgroundColor:'#e6e6e6',
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
