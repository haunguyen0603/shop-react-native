import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Components/Navigator.js';

export default function App() {
  return (
    <NavigationContainer>

      <Navigator />

    </NavigationContainer>
  );
}