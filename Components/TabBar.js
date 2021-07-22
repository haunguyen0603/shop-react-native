import React, { Component } from 'react';
import { Button, ScrollView, Text, View, Image, StyleSheet } from 'react-native';
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
import Header from './Header.js';

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

currencyFormat = (num) => {
  return 'VND ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const ProductDetailUI = ({ route, navigation }) => {
  // console.log(route.params)
  return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff', paddingHorizontal:15}}>

          <Text style={{fontSize: 15, fontWeight:'bold', alignItems: 'center'}}>Tên sản phẩm: {route.params.name}</Text>
          <Image source={{uri: 'http://192.168.1.7/shop/public/source/image/product/' + route.params.image}} style={{height: 500, width: 400}} />
          <Text style={{fontSize:20, fontWeight:'bold'}}>Giá: {currencyFormat(route.params.unit_price)}</Text>
          <Text style={{fontSize:20, fontWeight:'bold', color: 'red'}}>Giá khuyến mãi: {currencyFormat(route.params.promotion_price)}</Text>
          <Text style={{fontSize:15, fontWeight:'bold'}}>Chi tiết sản phẩm:</Text>
          <Text style={{fontSize:13}}>{route.params.description}</Text>

      </ScrollView>
      
  )
}

// function Header () {
//   return (
//     <View style={stylesHeader.header}>
//         <View style={stylesHeader.headerRow1}>
//             <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic' }}>FreeShip</Text>
//             <Text style={stylesHeader.title}>Shop Thời Trang</Text>
//             <TouchableOpacity>
//                 <MaterialCommunityIcons name='cart-outline' size={36} color='white'/>
//             </TouchableOpacity>
//         </View>
//         <TextInput style={stylesHeader.textInput} placeholder="Tìm kiếm" />
//         <StatusBar style='auto' />
//     </View>
//   )
// }

// const stylesHeader = StyleSheet.create({
//   header: {
//       height: height / 8,
//       backgroundColor: "#4d95c6",
//   },
//   headerRow1: {
//       flexDirection: "row",
//       justifyContent: 'space-between',
//       marginVertical: 5,
//       marginHorizontal: 8
//   },
//   textInput: {
//       marginHorizontal: 8,
//       height: height / 20,
//       backgroundColor: 'white',
//       borderRadius: 10,
//       paddingLeft: 10,
//   },
//   title: {
//       fontSize: 20,
//       color: 'white',
      
//   }
// })

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
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
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
            component={ProductDetailUI} 
            options={{
              headerTitle: 'Chi tiết sản phẩm',
            }}
          />
        </Stack.Navigator>
      )
    }

    HomeScreen = () => {
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
            name="ProductList" 
            component={Home} 
            options={{
              headerTitle: props => <Header />
            }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailUI}
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
                component={this.HomeScreen} 
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
                name="Cart" 
                component={this.DetailScreen} 
                options={{
                    tabBarLabel: 'Giỏ hàng',
                    tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
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
