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
                <View style={styles.header}>
                    <MaterialCommunityIcons name='account-circle' size={48} color='white' />
                    <View style={{flexDirection: 'row', padding:5}}>
                        <TouchableOpacity>
                            <Text style={{paddingHorizontal:5, fontSize:20}}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{paddingHorizontal:5, fontSize:20}}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
