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
    TouchableOpacity 
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
            var user = userCredential.user;
            this.setState({
                email: '',
                password: ''
            })
        })
        .catch((error) => {
            console.log(error);
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
                <TouchableOpacity onPress={() => {this.SignUp()}}>
                    <Text style={styles.content}>Đăng ký</Text>
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
})