import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import TabBar from './Components/TabBar.js';

export default function App() {
  return (
    <>
      <View style={styles.header}></View>
      <TabBar ></TabBar>
      <StatusBar style="auto" />
    </>
  );
}

var styles = StyleSheet.create({
  wrapper: {
      backgroundColor: "white",
      flex:1,
      flexDirection: 'column',
  },
  header: {
      backgroundColor: 'white',
      height: 75,
  },
})