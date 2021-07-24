import React, { Component } from 'react';
import 
{ 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Button,
    Alert,

} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fireBaseApp } from './FireBaseConfig';

const { height } = Dimensions.get('window');

export default class Profile extends Component {
    logOut () {
        fireBaseApp.auth().signOut().then(() => {
            // Sign-out successful.
            Alert.alert('THÔNG BÁO', 'Đăng xuất thành công!', [
                {text: 'OK', style: "default", onPress: () => this.props.navigation.replace('Login')}
            ])
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.avatar}><MaterialCommunityIcons name="account-circle-outline" size={144} color="#a9a9a9" />
                    {/* <Text>{console.log(this.props.route.params)}</Text> */}
                    <Text style={styles.title}>Xin chào {this.props.route.params.displayName ? this.props.route.params.displayName : this.props.route.params.email}</Text>
                </View>
                {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.content}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.content}>Đăng ký</Text>
                    </TouchableOpacity>
                </View> */}
                <Button title="Đăng xuất" onPress={() => this.logOut()} color="#dc143c" />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#fff'
    },
    avatar: {
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        color: 'blue',
    },
    title: {
        fontSize: 20,
        alignItems: 'center'
    }
})
