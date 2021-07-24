import React, { Component } from 'react'
import 
{ 
    SafeAreaView, 
    ScrollView, 
    Text, 
    View, 
    StyleSheet, 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    Image,
} from 'react-native';

import { fireBaseApp } from './FireBaseConfig';

const { width } = Dimensions.get('window');

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: '',
        }
    }

    SignUp () {
        fireBaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
            // Signed in 
            // console.log(userCredential)
            Alert.alert('Thông báo', this.state.email + ' Đã đăng ký thành công!', [
                {text: 'Cancel', onPress: () => console.log('Cancel Press'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.navigation.navigate('Profile')}
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
            Alert.alert('Thông báo', 'Đăng ký thất bại!',[
                {text: 'Cancel', onPress: () =>console.log('Cancel Press'), style: 'cancel'}
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
                <View style={{paddingBottom: 10}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Password"
                        onChangeText={( password ) => this.setState({password: password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                {/* <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Re-Password"
                        onChange={( rePassword ) => this.setState({rePassword})}
                        value={this.state.rePassword}
                        secureTextEntry={true}
                    />
                </View> */}
                <TouchableOpacity onPress={() => {this.SignUp()}} style={styles.SignUpButton}>
                    <Text style={styles.content}>Đăng ký ngay</Text>
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
        // padding: 20
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
    SignUpButton: {
        backgroundColor: '#20b2aa',
        padding: 10,
        height: 40,
        width: width * 0.9,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#1e90ff',
        margin: 20
    },
    logo: {
        height: 150,
        width: 150,
    }
})