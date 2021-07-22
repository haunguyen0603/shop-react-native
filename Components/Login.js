import React, { Component } from 'react'
import { version } from 'react'
import 
{ 
    Text, 
    View,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Button,
} from 'react-native'
import Register from './Register';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

function ProfileUI() {
    return (
        <Profile />
    );
}

function RegisterUI() {
    return (
        <Register />
    );
}

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{paddingBottom: 10}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Email"
                        onChange={( email ) => this.setState({email})}
                        value={this.state.email}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Password"
                        onChange={( password ) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    {/* <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.content}>Đăng Nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.signUpButton} 
                        onPress={() => navigation.navigate('Profile')} 
                    >
                        <Text style={styles.content}>Đăng Ký </Text>
                    </TouchableOpacity> */}

                    {/* <Button title="Đăng Ký" onPress={() => {this.props.navigation.navigate('Register')}} /> */}
                </View>  
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4d95c6'
    },
    inputText: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#fff',
        height: 40,
        width: width*0.9,
    },
    content: {
        fontSize: 15,
        color: '#fff'
    },
    loginButton: {
       backgroundColor: 'green',
       padding: 10,
       height: 40,
       width: 150,
       borderRadius: 10,
       alignItems: 'center',
       justifyContent: 'center'
    },
    signUpButton: {
        backgroundColor: 'red',
        padding: 10,
        height: 40,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
