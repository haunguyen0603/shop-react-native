import React, { Component } from 'react';
import { Button, ScrollView, Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductList from './ProductList.js';
import Home from './Home.js';
import Profile from './Profile.js';
import ContactUs from './ContactUs.js';
import Login from './Login.js';
import Register from './Register.js';
import Cart from './Cart.js';
import { fireBaseApp } from './FireBaseConfig.js';
import Account from './Account.js';
import UserOrder from './UserOrder.js';
import { Avatar, ListItem } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window')

currencyFormat = (num) => {
    return 'VND ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
  const ProductDetailUI = ({ route, navigation }) => {
    // console.log(route.params)
    return (
        <View style={styles.container}>
            <ScrollView>
            <Image source={{uri: 'http://192.168.1.10/shop/public/source/image/product/' + route.params.image}} style={{height: 400, width: 400, paddingTop: 20}} />
            <Text style={styles.title}>Tên sản phẩm: {route.params.name}</Text>
            <Text style={styles.title}>Giá: {currencyFormat(route.params.unit_price)}</Text>
            <Text style={styles.promotion}>Giá khuyến mãi: {currencyFormat(route.params.promotion_price)}</Text>
            <Text style={styles.title}>Mô tả sản phẩm:</Text>
            <Text style={styles.content}>{route.params.description}</Text>
            </ScrollView>
            <View>
                <Button title="Thêm giỏ hàng" />
            </View>
        </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff', 
      paddingHorizontal: 15,
    },
    promotion: {
      fontSize: 20, 
      // fontWeight:'bold',
      fontStyle: 'italic',
      paddingTop: 20,
      color: 'red',
      paddingTop: 20
    },
    title: {
      fontSize: 20, 
      fontWeight:'bold', 
      paddingTop: 20,
    },
    content: {
      fontSize:15,
      paddingVertical: 20
    }
  })

export default class Navigator extends Component {
    HomeTab () {
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
                    component={ProductList} 
                    options={{
                        tabBarLabel: 'Danh Mục',
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-bulleted-type" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Cart" 
                    component={Cart} 
                    options={{
                        tabBarLabel: 'Giỏ hàng',
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
                        ),
                    }}
                >
                    {/* Stack Screen here */}
                    
                </Tab.Screen>
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
                <Tab.Screen name="Account"
                    options={{
                        tabBarLabel: 'Tài khoản',
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                    }}
                >
                    {() => (
                        <Stack.Navigator
                            screenOptions={{
                                headerStyle: {
                                backgroundColor: '#4d95c6',
                                },
                                headerTintColor: '#fff',
                                
                            }}
                        >
                        {fireBaseApp.auth().currentUser === null ? (
                            <Stack.Screen 
                                name="Profile" 
                                component={Account} 
                                options={({ navigation, route }) => ({
                                    headerTitle: "",
                                    headerLeft: () => (
                                        <ListItem containerStyle={{backgroundColor: '#4d95c6', width: width}}>
                                            <Avatar
                                                icon={{name: 'user', type: 'font-awesome'}}
                                                source={{uri: "../assets/logo.png"}}
                                                size="medium"
                                                rounded
                                                onPress={() => navigation.navigate('Login')}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{<Text style={{color: '#fff', fontWeight:'bold'}} onPress={() => navigation.navigate('Login')}>Xin chào quý Khách</Text>}</ListItem.Title>
                                                <ListItem containerStyle={{backgroundColor: '#4d95c6', padding:0, margin:0}}>
                                                    <ListItem.Title>{<Text style={{color: '#fff'}} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>}</ListItem.Title>
                                                </ListItem>
                                            </ListItem.Content>
                                        </ListItem>
                                    ),
                                })}
                            />
                        ) : (
                            <Stack.Screen 
                                name="Privacy" 
                                component={Account} 
                                options={({ navigation, route }) => ({
                                    headerTitle: "",
                                    headerLeft: () => (
                                        <ListItem containerStyle={{backgroundColor: '#4d95c6', width: width}}>
                                            <Avatar
                                                icon={{name: 'user', type: 'font-awesome'}}
                                                source={{uri: "../assets/logo.png"}}
                                                size="medium"
                                                rounded
                                                onPress={() => navigation.navigate('Profile')}
                                            />
                                            <ListItem.Content>
                                                <ListItem.Title>{fireBaseApp.auth().currentUser.email}</ListItem.Title>
                                                <ListItem.Content>{<Text>Welcome Back</Text>}</ListItem.Content>
                                            </ListItem.Content>
                                        </ListItem>
                                    ),
                                    
                                })}
                            />
                        )}     
                        </Stack.Navigator>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        )
    }

    render() {
        return (
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                    backgroundColor: '#4d95c6',
                    },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen 
                    name="Home"
                    component={this.HomeTab} 
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen 
                    name="ProductDetail" 
                    component={ProductDetailUI} 
                    options={{
                        headerTitle: 'Chi tiết sản phẩm',
                    }}
                />
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{
                        headerTitle: "Đăng nhập ứng dụng"
                    }}
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register}
                    options={{
                        headerTitle: 'Đăng ký thành viên',
                    }}
                />
                <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{
                        headerTitle: 'Thông tin cá nhân',
                        headerRight: () => (
                            <TouchableOpacity style={{marginRight:10}} onPress={() => console.log("Submit")}>
                                <MaterialCommunityIcons name="account-check-outline" size={36} color="#fff" />
                            </TouchableOpacity>
                        )
                    }}
                />
                <Stack.Screen 
                    name="Order" 
                    component={UserOrder}
                    options={({ navigation, route }) => ({
                        headerTitle: 'Thông tin đặt hàng',
                    })}
                />
                
            </Stack.Navigator>
        )
    }
}
