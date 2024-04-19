// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './screens/signUp/page';
import LoginScreen from './screens/login/page';
import HomeScreen from './screens/Home/page';
import SignOutScreen from './screens/signOut/page';
import NameScreen from './screens/name/nameScreen';
import TaglineScreen from './screens/tagline/page';
import DataScreen from './screens/Data/page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="Tagline" component={TaglineScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
        <Stack.Screen name="signOut" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
