import React, { Component } from "react";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export default class ConNguoi extends Component{
    constructor(props){
        super(props);
        this.state = {
            chieucao: 0,
        }
    }

    clickMe (){
        // console.log("test");
        this.setState({
            chieucao: this.state.chieucao + 100
        });
    }

    render(){
        return(
            <TouchableOpacity onPress={()=>{this.clickMe()}}>
                <View style={ao.bao}>
                    <Text>{this.props.hoten}</Text>
                    <Text>{this.state.chieucao}</Text>
                    
                </View>
            </TouchableOpacity>
        )
    }
}

var ao = StyleSheet.create({
    bao:{
        width:200,
        height:100,
        backgroundColor: 'red',
        margin:40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})