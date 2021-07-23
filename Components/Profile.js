import React, { Component } from 'react';
import 
{ 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,

} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class Profile extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Welcome</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: height / 8,
        backgroundColor: "#4d95c6",
        justifyContent: 'center',
        alignItems: 'center'
    }
})
