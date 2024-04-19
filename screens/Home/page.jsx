import { View, Text,Button } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}) {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="DataScreen" onPress={()=>navigation.navigate('Data')} />
      <Button title="logoutScreen" onPress={()=>navigation.navigate('signOut')} />
    </View>
  )
}