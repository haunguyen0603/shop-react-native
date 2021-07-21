import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductList from './ProductList.js';
import Home from './Home.js';
import Profile from './Profile.js';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1}}>
        <Home />
      </View>
    );
}

function Categories() {
    return (
      <View style={{ flex: 1 }}>
        <ProductList />
      </View>
    );
}
  
function Account() {
    return (
      <View style={{ flex: 1 }}>
        <Profile />
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
                        component={Account}
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
