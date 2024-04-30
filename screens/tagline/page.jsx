import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet,ScrollView,KeyboardAvoidingView } from 'react-native';
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
  <>
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
  <KeyboardAvoidingView behavior="padding" enabled style={{flex: 1}}>
  <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.HeaderView} >
   
    <Text style={styles.headerNotice}>Let's add your Profile Picture and Name.That way people will recognise you</Text>
    <View style={styles.Logo}>
      <Text style={styles.nameText}>Please add tagline to your Profile</Text>
    </View>
    
    <View style={styles.MiddleView}>
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

    </View>
   
  
  <View style={styles.BottomView}>
      
      <Button
        title="NEXT"
        onPress={handleSaveDetails}
        buttonStyle={{backgroundColor: '#02093B',borderRadius:0 ,padding:15,margin:0}} // Change button color here
      />
    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  </>
  
  
);
}

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
},
HeaderView:{
 flex:2,
 padding:20,
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
MiddleView:{
 flex:3
},

BottomView:{
  flex:1,
  justifyContent: 'flex-end',
 }
});
