import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
export default function AddSkillScreen() {
  return (
    <View>
      <Text>Add Skill page</Text>
      <Button
          title="DONE"
          onPress={()=>navigation.navigate('SignIn')}
          buttonStyle={{ backgroundColor: '#02093B' }} // Change button color here
        />
    </View>
  )
}