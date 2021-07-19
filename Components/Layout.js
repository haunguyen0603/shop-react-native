import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
} from 'react-native'
import { sqrt } from 'react-native-reanimated'

export default class Layout extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.header}></View>
                <View style={styles.body}></View>
                <View style={styles.footer}></View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "white",
        flex:1,
        flexDirection: 'column',
    },
    header: {
        backgroundColor: 'red',
        height: 75,
        borderWidth: 1,
    },
    body: {
        flex: 1,
        borderWidth: 1,
    },
    footer: {
        backgroundColor: 'yellow',
        height: 75,
        borderWidth: 1,
    }
})