import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import { fireBaseApp } from './FireBaseConfig'

const { width } = Dimensions.get('window');

export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        user = fireBaseApp.auth().currentUser;
        this.state ={
            oldPassword: '',
            newPassword: '',
            rePassword: ''
        }
    }

    submit () {

        user.updatePassword(this.state.newPassword).then(() => {
            // Update successful.

        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{paddingVertical: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Mật khẩu cũ"
                        onChangeText={( oldPassword ) => this.setState({oldPassword: oldPassword})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Mật khẩu mới"
                        onChangeText={( newPassword ) => this.setState({newPassword: newPassword})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Nhập lại mật khẩu"
                        onChangeText={( rePassword ) => this.setState({rePassword: rePassword})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.SubmitButton} onPress={() => this.submit()}>
                    <Text style={styles.content}>Lưu lại</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
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
    SubmitButton: {
        backgroundColor: 'red',
        padding: 10,
        height: 40,
        width: width * 0.9,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
