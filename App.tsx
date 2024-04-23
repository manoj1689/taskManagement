// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './screens/signUp/page';
import HomeScreen from './screens/Home/page';
import SignOutScreen from './screens/signOut/page';
import NameScreen from './screens/name/page';
import TaglineScreen from './screens/tagline/page';
import DataScreen from './screens/Data/page';
import SignInScreen from './screens/SignIn/page';
import SelectSkillScreen from './screens/skills/selectSkill/page';
import AddSkillScreen from './screens/skills/addSkill/page';
import SearchSkillScreen from './screens/skills/searchSkill/page';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  >
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Name" component={NameScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Tagline" component={TaglineScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="SelectSkill" component={SelectSkillScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="SearchSkill" component={SearchSkillScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="AddSkill" component={AddSkillScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
        <Stack.Screen name="signOut" component={SignOutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
