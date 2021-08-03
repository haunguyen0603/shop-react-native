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
        this.auth = fireBaseApp.auth().currentUser;
    }

    logOut () {
        fireBaseApp.auth().signOut().then(() => {
            // Sign-out successful.
            Alert.alert('THÔNG BÁO', 'Đăng xuất thành công!', [
                {text: 'OK', style: "default", onPress: () => this.props.navigation.replace('Home')}
            ], 
                {cancelable: false}
            )
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="account-box-outline" size={36} color='#b0e0e6' />
                        <TextInput placeholder="Họ và tên" style={styles.inputText} />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="card-account-details-outline" size={36} color='#b0e0e6' />
                        <TextInput placeholder="Địa chỉ" style={styles.inputText} />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="cellphone-iphone" size={36} color='#b0e0e6' />
                        <TextInput placeholder="Số điện thoại" style={styles.inputText} keyboardType="phone-pad" />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="history" size={36} color='#90ee90' />
                        <TouchableOpacity>
                            <Text style={styles.buttonLine}>Lịch sử đặt hàng</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
                <Button title="Đăng xuất" color="#dc143c" onPress={() => this.logOut()} />
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
        alignItems: 'center'
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
