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

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>{console.log(this.props.navigation)}</Text>
                <ScrollView >
                    <View style={styles.avatar}>
                        <MaterialCommunityIcons name="account-circle-outline" size={144} color="#a9a9a9" />
                        <Text style={styles.title}>Xin chào Khách!</Text>
                        <Text style={styles.title}>Hãy đăng nhập để thấy những thông tin</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.content}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.content}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    
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
    avatar: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    content: {
        color: 'blue',
        fontSize: 15
    },
    title: {
        fontSize: 20,
        alignItems: 'center',
        fontStyle: 'italic',
        color: "#90ee90"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        marginVertical: 10
    },
    buttonLine: {
        borderRadius: 20,
        backgroundColor: '#90ee90',
        height: 40,
        width: width * 0.8,
        padding: 10,
        color: '#000080'
    },
    inputText: {
        borderRadius: 10,
        backgroundColor: '#b0e0e6',
        height: 40,
        width: width * 0.8,
        padding: 10
    },
})
