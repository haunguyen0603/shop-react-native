import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductList from './ProductList.js';
import Home from './Home.js';
import Profile from './Profile.js';
import ContactUs from './ContactUs.js';
import Login from './Login.js';
import Register from './Register.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function AboutUs() {
  return (
    <View style={{ flex: 1 }}>
      <ContactUs />
    </View>
  );
}
  
const Account = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    );
}

const LoginScreen = ({ navigation }) => {
  return (
    <>
    <Login />
      
      <Button
        title="Đăng nhập"
        onPress={() => navigation.replace('Profile')}
      />
      <Button
        title="Đăng ký"
        onPress={() => navigation.navigate('Register')}
      />
    </>
  );
};

const RegisterScreen = ({ navigation }) => {
  return (
    <>
    <Register />
    <Button
      title="Tạo tài khoản"
      onPress={() => navigation.navigate('Login')}
    />
    </>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return (
    <View>
      <Text>This is profile</Text>
      <Button 
        title="Logout"
        onPress={() => navigation.replace('Login')} 
      />  
    </View>

  );
};

export default class TabBar extends Component {
    render() {
      return (
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
                name="ContactUs" 
                component={AboutUs}
                options={{
                    tabBarLabel: 'Liên hệ',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="phone-classic" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Account"
                children={Account}
                options={{
                    tabBarLabel: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
      );
    }
}
