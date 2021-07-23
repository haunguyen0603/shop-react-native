import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Button, Dimensions } from 'react-native'

const { height } = Dimensions.get('window');

export default class Cart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>  
                    <View style={styles.frameItem}>

                    </View>
                </ScrollView>
                <View style={styles.buttonFrame}>
                    <Button title="thanh toán" color="#dc143c" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    frameItem: {
        backgroundColor: "#f8f8ff",
        height: height / 5,
        marginVertical: 5,
        marginHorizontal: 10
    },
    buttonFrame: {
        marginVertical: 5,
        borderRadius: 10
    }
})
