import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductList from './ProductList.js';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1}}>
        <ProductList />
      </View>
    );
}

function Categories() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Categories!</Text>
      </View>
    );
}
  
function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
}

export default class TabBar extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen} 
                        options={{
                            tabBarLabel: 'Trang chủ',
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="home" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name="Categories" 
                        component={Categories} 
                        options={{
                            tabBarLabel: 'Danh Mục',
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={size} />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name="Profile"
                        component={SettingsScreen}
                        options={{
                            tabBarLabel: 'Tài khoản',
                            tabBarIcon: ({ color, size }) => (
                              <MaterialCommunityIcons name="account" color={color} size={size} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
            
        );
    }
}
