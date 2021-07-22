import React, { Component } from 'react'
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Dimensions, TextInput } from 'react-native'

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
                <View style={{paddingBottom: 10}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Password"
                        onChange={( password ) => this.setState({password})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={{paddingBottom: 20}}>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Re-Password"
                        onChange={( rePassword ) => this.setState({rePassword})}
                        value={this.state.rePassword}
                        secureTextEntry={true}
                    />
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
})