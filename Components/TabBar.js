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
import ProductDetail from './ProductDetail.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
    DetailScreen = () => {
      return (
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4d95c6',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="ProductList" 
            component={ProductList} 
            options={{
              headerTitle: 'Danh sách sản phẩm',
            }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetail} 
            options={{
              headerTitle: 'Chi tiết sản phẩm',
            }}
          />
        </Stack.Navigator>
      )
    }

    render() {
      return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarLabel: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Categories" 
                children={this.DetailScreen} 
                options={{
                    tabBarLabel: 'Danh Mục',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="ContactUs" 
                component={ContactUs}
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
