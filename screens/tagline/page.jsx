import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function TaglineScreen({ navigation }) {
  const [tagline, setTagline] = useState('');
  const [organization, setOrganization] = useState('');

  const handleSaveDetails = async () => {
    try {
      // Save the tagline and organization name to AsyncStorage
      await AsyncStorage.multiSet([['tagline', tagline], ['organization', organization]]);
      // Navigate to the main app screen
      navigation.navigate('SelectSkill');
    } catch (error) {
      console.error('Error saving details:', error);
    }
  };

 
return (
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.screenView} >
    <View style={styles.headerTittle}>
    <Icon
      name="arrow-back-outline"
      type="font-awesome"
      size={22}
      style={styles.icon}
      onPress={()=>navigation.navigate('Name')}
    />
    <Text style={styles.text}>We are almost done !!</Text>
    </View>
    <Text style={styles.headerNotice}>Let's add your Profile Picture and Name.That way people will recognise you</Text>
    <View style={styles.Logo}>
      <Text style={styles.nameText}>Please add tagline to your Profile</Text>
    </View>
    
    <TextInput
      style={styles.input}
      placeholder="Enter your Tagline"
      value={tagline}
      onChangeText={setTagline}
    />
    <View style={styles.Logo}>
      <Text style={styles.nameText}>Organisation Name</Text>
    </View>
    
    <TextInput
      style={styles.input}
      placeholder="Enter your Organistion Name"
      value={organization}
      onChangeText={setOrganization}
    />
  </View>
  
  <View style={styles.bottomButton}>
      
      <Button
        title="NEXT"
        onPress={handleSaveDetails}
        buttonStyle={{backgroundColor: '#02093B',borderRadius:0 ,padding:15,margin:0}} // Change button color here
      />
    </View>
  </ScrollView>
  
);
}

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  paddingVertical: 10,
},
screenView:{
 padding:20,
},
headerTittle:{
  flexDirection: 'row', // Arrange children in a row
  alignItems: 'center', // Center children vertically
  fontWeight:'600'
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

bottomButton: {
  width:'100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
},
});
