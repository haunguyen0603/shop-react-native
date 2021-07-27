import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class UserOrder extends Component {
    render() {
        return (
            <View>
                <Text> {console.log(route.params)} </Text>
            </View>
        )
    }
}
