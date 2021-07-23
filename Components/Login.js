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
    Alert,
} from 'react-native'
import { fireBaseApp } from './FireBaseConfig';

const { width } = Dimensions.get('window');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    Login () {
        fireBaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            // Signed in 
            // console.log(userCredential)
            Alert.alert('Thông báo', 'Đăng nhập thành công!', [
                {text: 'OK', onPress: () => this.props.navigation.replace('Profile')}
            ], 
                {cancelable: false}
            )
            var user = userCredential.user;

            this.setState({
                email: '',
                password: ''
            })
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Thông báo', 'Đăng nhập thất bại!',[
                {text: 'Cancel', onPress: () =>console.log('Cancel Press'), style: 'cancel'}
            ], 
                {cancelable: false}
            )
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{paddingBottom: 10}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Email"
                        onChangeText={( email ) => this.setState({email: email})}
                        value={this.state.email}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Password"
                        onChangeText={( password ) => this.setState({password: password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.Login()}>
                    <Text style={styles.content}>Đăng Nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => {this.props.navigation.navigate('Register')}}
                >
                    <Text style={styles.signUpButton}>Bạn chưa có tài khoản? Đăng ký ngay</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding:20
    },
    inputText: {
        borderWidth: 1.5,
        borderRadius: 7,
        backgroundColor: '#fff',
        height: 40,
        width: width * 0.9,
        padding: 10
    },
    content: {
        fontSize: 15,
        color: '#fff'
    },
    loginButton: {
        backgroundColor: 'green',
        padding: 10,
        height: 40,
        width: width * 0.9,
        borderRadius: 10,
        alignItems: 'center',
    },
    signUpButton: {
        color: 'blue',
        borderRadius: 10,
        fontSize: 15,
        fontStyle: 'italic',
        paddingTop: 20
    }
})
