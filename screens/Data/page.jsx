import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DataScreen() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(keys);
        setUserData(data);
      } catch (error) {
        console.error('Error getting data from AsyncStorage:', error);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Data stored in AsyncStorage:</Text>
      {userData ? (
        <View>
          {userData.map((item, index) => (
            <Text key={index}>{`${item[0]}: ${item[1]}`}</Text>
          ))}
        </View>
      ) : (
        <Text>No data found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
  },
});
