import React, { Component } from 'react'
import 
{ 
    Dimensions,
    Text, 
    TextInput, 
    View,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default class Header extends Component {


    render() {
        return (
            <View style={styles.header}>
                <View style={styles.headerRow1}>
                    <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic' }}>FreeShip</Text>
                    <Text style={styles.title}>Shop Thời Trang</Text>
                    <Image style={{ width: 36, height: 36 }} source={{uri: './assets/favicon.png'}} />                   
                </View>
                <TextInput style={styles.textInput} placeholder="Tìm kiếm" />
                {/* <StatusBar style='auto' /> */}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: height / 7.5,
        backgroundColor: "#4d95c6",
        width: width,
        paddingTop: 25
    },
    headerRow1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        // marginVertical: 5,
        marginHorizontal: 8
    },
    textInput: {
        marginHorizontal: 8,
        height: height / 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
