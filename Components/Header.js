import React, { Component } from 'react'
import 
{ 
    Dimensions,
    Text, 
    TextInput, 
    View,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class Header extends Component {


    render() {
        return (
            <View style={styles.header}>
                <View style={styles.headerRow1}>
                    {/* <TouchableOpacity style={{alignContent: 'center'}}>
                        <MaterialCommunityIcons name='chevron-left' size={36} />
                    </TouchableOpacity> */}
                    <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic' }}>FreeShip</Text>
                    <Text style={styles.title}>Shop Thời Trang</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name='cart-outline' size={36} color='white'/>
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.headerRow2} placeholder="  Tìm kiếm" />
                <StatusBar style='auto' />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: height / 8,
        backgroundColor: "#4d95c6",
    },
    headerRow1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical: 5,
        marginHorizontal: 8
    },
    headerRow2: {
        marginHorizontal: 8,
        height: height / 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        color: 'white',
        
    }
})
