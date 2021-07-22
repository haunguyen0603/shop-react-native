import 'react-native-gesture-handler';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TabBar from './Components/TabBar.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <TabBar />

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4d95c6',
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  }
})