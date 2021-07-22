import React, { Component } from 'react'
import 
{ 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet, 
    Dimensions,
    ScrollView,
    TextInput,
    Button,
    Touchable,
    TouchableOpacity,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Header from './Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class ContactUs extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header />
                <ScrollView>
                    <View style={styles.layoutView}>
                        <MapView
                            initialRegion={{
                                latitude: 10.85132525861923,
                                longitude: 106.75589379859845,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                            style={styles.mapSize}
                        >
                            <Marker 
                                coordinate={{ latitude : 10.85132525861923 , longitude : 106.75589379859845 }}
                            />
                        </MapView>
                    </View>
                    <View style={styles.layoutView}>
                        <Text style={styles.title}>THÔNG TIN LIÊN HỆ</Text>
                        <Text style={styles.content}><MaterialCommunityIcons name='office-building' size={24} color='red' /> 137E Nguyễn Chí Thanh, Phường 9, Quận 5, TP. Hồ Chí Minh, Việt Nam</Text>
                        <Text style={styles.content}><MaterialCommunityIcons name='phone-message' size={24} color='red' /> 0392009814</Text>
                        <Text style={styles.content}><MaterialCommunityIcons name='phone-message' size={24} color='red' /> 0938090374</Text>
                        <Text style={styles.content}><MaterialCommunityIcons name='email-edit' size={24} color='red' /> haunguyen0603@gmail.com</Text>
                    </View>
                    <View style={styles.layoutView}>
                        <Text style={styles.title}>GỬI YÊU CẦU TỚI CHÚNG TÔI</Text>
                        <TextInput style={styles.input} placeholder="Điền Họ và tên" />
                        <TextInput style={styles.input} placeholder="Điền Email cá nhân" />
                        <TextInput style={styles.input} placeholder="Tiêu đề" />
                        <TextInput style={styles.input} placeholder="Tin nhắn của bạn" />
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={styles.title}><MaterialCommunityIcons name='email-send' size={24} color='#4d95c6' /> GỬI TỚI CHÚNG TÔI</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mapSize: {
        height: height / 2,
        width: 'auto'
    },
    layoutView: {
        paddingHorizontal:10,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        color: '#4d95c6',
        paddingTop: 10,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 15,
        paddingTop: 10,
    },
    input: {
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        marginTop: 15
    }
})