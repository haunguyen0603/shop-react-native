import React, { Component } from 'react'
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
    Image,
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
            // console.log(userCredential.user)
            var user = userCredential.user;
            Alert.alert('Thông báo', 'Đăng nhập thành công!', [
                {text: 'OK', onPress: () => this.props.navigation.navigate('Privacy', user)}
            ], 
                {cancelable: false}
            )
            
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch((error) => {
            console.log(error.code);

            var msg = "Đăng nhập thất bại!";

            if (error.code === "auth/invalid-email"){
                msg = "Email không đúng định dạng!"
            } else if (error.code === "auth/user-not-found"){
                msg = "Không tìm thấy email đăng ký!"
            } else if (error.code === "auth/wrong-password"){
                msg = "Sai password, vui lòng thử lại!"
            }
            
            Alert.alert('Thông báo', msg ,[
                {text: 'Cancel', style: 'cancel'}
            ], 
                {cancelable: false}
            )
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Shop thời trang</Text>
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
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Register')}}>
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
        // padding:20
    },
    title: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#1e90ff',
        margin: 20
    },
    inputText: {
        borderWidth: 1.5,
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 50,
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
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpButton: {
        color: 'blue',
        borderRadius: 10,
        fontSize: 15,
        fontStyle: 'italic',
        paddingTop: 20
    },
    logo: {
        height: 150,
        width: 150,
    }
})
