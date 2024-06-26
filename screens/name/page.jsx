import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,Image,ScrollView, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'; 
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
    <>
       <View style={styles.headerTittle}>
    <Icon onPress={()=>navigation.navigate("SignUp")}
      name="arrow-back-outline"
      type="font-awesome"
      size={22}
      style={styles.icon}
    />
    <Text style={styles.text}>Hi, It's nice to meet you</Text>
    </View>

<KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.inner}>
       
  
     
      <View style={styles.HeaderView} >
    
      <Text style={styles.headerNotice}>Let's add your Profile Picture and Name.That way people will recognise you</Text>
      <View style={styles.Logo}>
      <Image
          source={require('../assets/business.png')}
          style={styles.image}
        />
        <Text style={styles.nameText}>What can i call you ?</Text>
      </View>
      <View style={styles.MiddleView}>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={name}
        onChangeText={setName}
      />

      </View>
    
     
    </View>
   
    <View style={styles.BottomView}>
        
        <Button
          title="NEXT"
          onPress={handleNext}
          buttonStyle={{backgroundColor: '#02093B',borderRadius:0 ,padding:15,margin:0}} // Change button color here
        />
      </View>
    
    </ScrollView>
   
    </KeyboardAvoidingView>
    </>
     

  );
}

const styles = StyleSheet.create({
  inner: {
    flexGrow: 1,
  },
  HeaderView:{
   flex:3,
   padding:20
   
  },
  MiddleView:{
    flex:2,
  },
  headerTittle:{
    flexDirection: 'row', // Arrange children in a row
    alignItems: 'center', // Center children vertically
    fontWeight:'600',
    padding:10
  },
  icon: {
    marginRight: 8, // Add space between icon and text
    color: 'black', // Set color to black
  },
  text: {
    marginLeft:30,
    fontSize:24,
    color: 'black',
  },
  headerNotice:{
    
    margin:20,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 20,
    color: 'black',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  Logo:{
    justifyContent: 'center',
    alignItems: 'center',
  },
nameText:{
  color:'black',
  fontSize:14,
  marginTop:20,
  marginBottom:20,
},
  input: {
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#e6e6e6',
    backgroundColor: '#e6e6e6',
    paddingLeft: 8,
  },

BottomView:{
 flex:1,
 justifyContent: 'flex-end',
}
});
