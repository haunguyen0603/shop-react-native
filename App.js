import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TabBar from './Components/TabBar.js';
import Header from './Components/Header.js';

export default function App() {
  return (
    <>
      {/* <Header /> */}
      <TabBar />
      {/* <StatusBar style="auto" /> */}
    </>
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