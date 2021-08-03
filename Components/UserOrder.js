import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class UserOrder extends Component {
    render() {
        return (
            <View>
                <Text> {console.log(this.props.route.params)} </Text>
            </View>
        )
    }
}
