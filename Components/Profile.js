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
import { Avatar } from 'react-native-elements';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window')

export default class Profile extends Component {
    constructor (props) {
        super(props);
        this.user = fireBaseApp.auth().currentUser;
        this.state = {
            fullname: this.user.displayName,
            address: '',
            phone: this.user.phoneNumber,
        }

        this.props.navigation.setOptions({ 
            headerRight: () => (
                <TouchableOpacity style={{marginRight:10}} onPress={() => this.submitProfile()}>
                    <MaterialCommunityIcons name="account-check-outline" size={36} color="#fff" />
                </TouchableOpacity>
            )
        });
    }

    submitProfile() {
        this.user.updateProfile({
            displayName: this.state.fullname,
            phoneNumber: this.state.phone,
            photoURL: null
        }).then(() => {
            Alert.alert('THÔNG BÁO', 'Cập nhật thành công!', [
                {text: "OK", onPress: () => this.props.navigation.navigate('Privacy')}
            ]);
            console.log(this.user)

        }).catch((error) => {
            console.log(error)
        })
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
                    <View style={{justifyContent:'center', alignItems:'center', paddingVertical: 15}}>
                        <Avatar
                            size="xlarge"
                            icon={{name: 'user', color: 'orange', type: 'font-awesome'}}
                            overlayContainerStyle={{backgroundColor: 'gray'}}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                            // containerStyle={{flex: 4, marginTop: 20}}
                            rounded
                        />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="email-check-outline" size={36} color='#b0e0e6' />
                        <TextInput 
                            placeholder="Email"
                            style={styles.inputText} 
                            defaultValue={this.user.email}
                            editable={false}
                        />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="account-box-outline" size={36} color='#b0e0e6' />
                        <TextInput 
                            placeholder="Họ và tên" 
                            style={styles.inputText} 
                            defaultValue={this.user.displayName}
                            onChangeText={( fullname ) => this.setState({fullname: fullname})}
                        />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="card-account-details-outline" size={36} color='#b0e0e6' />
                        <TextInput 
                            placeholder="Địa chỉ" 
                            style={styles.inputText} 
                            onChangeText={( address ) => this.setState({address: address})}
                            value={this.state.address}
                            />
                    </View>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="cellphone-iphone" size={36} color='#b0e0e6' />
                        <TextInput 
                            placeholder="Số điện thoại" 
                            style={styles.inputText} 
                            defaultValue={this.user.phoneNumber}
                            keyboardType="phone-pad" 
                            onChangeText={( phone ) => this.setState({phone: phone})}
                        >{this.user.phoneNumber}</TextInput>
                    </View>
                    {/* <View style={styles.row}>
                        <MaterialCommunityIcons name="history" size={36} color='#90ee90' />
                        <TouchableOpacity>
                            <Text style={styles.buttonLine}>Lịch sử đặt hàng</Text>
                        </TouchableOpacity>
                    </View> */}
                    
                </ScrollView>
                <Button title="Đăng xuất" color="#dc143c" onPress={() => this.logOut()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
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
