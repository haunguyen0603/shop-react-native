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
import { ListItem, Icon } from 'react-native-elements'

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window')

export default class Account extends Component {
    constructor(props){
        super(props);
        user = fireBaseApp.auth().currentUser;
    }

    list = [
        {
            title: 'Lịch sử đặt hàng',
            icon: 'av-timer',
            navigate: () => {
                if(user) {
                    this.props.navigation.navigate('OrderHistory')
                } else {
                    this.props.navigation.navigate('Login')
                }
            }
        },
        {
            title: 'Passwords',
            icon: 'fingerprint',
            navigate: () => {
                if(user) {
                    this.props.navigation.navigate('ChangePassword')
                } else {
                    this.props.navigation.navigate('Login')
                }
            }
        },
    ]

    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    {
                        this.list.map((item, i) => (
                            <ListItem key={i} bottomDivider onPress={item.navigate}>
                              <Icon name={item.icon} />
                              <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                              </ListItem.Content>
                              <ListItem.Chevron />
                            </ListItem>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20
    },
    
})
