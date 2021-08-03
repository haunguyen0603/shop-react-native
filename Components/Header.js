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
                <Image style={{ width: 50, height: 50 }} source={require('../assets/logo.png')} />
                <Text style={styles.title}>Shop Thời Trang</Text>
                <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic' }}>FreeShip</Text>                  
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 9,
        backgroundColor: "#4d95c6",
        paddingTop: 25,
        paddingHorizontal: 10

    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
