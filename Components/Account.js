import React, { Component } from 'react';
import 
{ 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Button,
    Alert,
    TextInput,
    ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fireBaseApp } from './FireBaseConfig';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window')

export default class Account extends Component {
    constructor(props){
        super(props);
        user = fireBaseApp.auth().currentUser;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text>{console.log(user)}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    
})
