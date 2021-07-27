import React, { Component } from 'react'
import 
{ 
    Text, 
    View, 
    StyleSheet, 
    Button, 
    Dimensions, 
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { fireBaseApp } from './FireBaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class Cart extends Component {
    constructor(props) {
        super (props);
        this.itemRef = fireBaseApp.database().ref('Cart');
        this.state = {
            dataSource: [],
            qty: 1,
        }
    }

    getData() {
        fireBaseApp.auth().onAuthStateChanged((user) => {
            if (user) {
                var item = []
                this.itemRef.child(user.uid).on('child_added', (dataSnapshot) =>{
                    item.push({
                        key: dataSnapshot.key,
                        productName: dataSnapshot.val().productName,
                        productImage: dataSnapshot.val().productImage,
                        productPrice: dataSnapshot.val().productPrice,
                        productQty: dataSnapshot.val().productQty,
                    });
                    this.setState({
                        dataSource: item
                    })
                });
                this.itemRef.child(user.uid).on('child_removed', (dataSnapshot) =>{
                    item = item.filter((x) => x.key != dataSnapshot.key);
                    this.setState({
                        dataSource: item
                    })
                });
            } else {
                this.setState({
                    dataSource: []
                })
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    currencyFormat = (num) => {
        return 'VND ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    minus () {
        this.setState({
            qty: (this.state.qty - 1)
        }, console.log(this.state.qty))
    }

    plus () {
        this.setState({
            qty: (this.state.qty + 1)
        }, console.log(this.state.qty))
    }

    deleteItem (key) {
        var user = fireBaseApp.auth().currentUser.uid
            if (user) {
                Alert.alert('THÔNG BÁO', 'Bạn muốn xóa chứ?', [
                    {text: 'Cancel', style: "cancel"},
                    {text: 'OK', onPress: () => {this.itemRef.child(user).child(key).remove(); this.getData()}}
                ], 
                    {cancelable: false}
                );
                
            }
            

    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem= {({item}) => (
                        <View style={styles.frameItem}>
                            <View style={{alignItems: "center"}}>
                                <Image source={{uri: "http://192.168.1.7/shop/public/source/image/product/" + item.productImage}} style={styles.imageStyle} />
                                <Text style={styles.title}>{item.productName}</Text>
                            </View>
                            <Text style={styles.price}>{this.currencyFormat(item.productPrice)}</Text>
                            <View style={{justifyContent: 'space-around', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => this.deleteItem(item.key)}>
                                    <MaterialCommunityIcons name="delete-circle-outline" size={48} color="red" />
                                </TouchableOpacity>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.minus()}>
                                        <MaterialCommunityIcons name="minus-circle-outline" size={36} />
                                    </TouchableOpacity>
                                    <TextInput 
                                        style={styles.inputText} 
                                        keyboardType="number-pad"
                                        onChangeText={(qty) => this.setState({qty: qty})}
                                    >{(this.state.qty)}</TextInput>
                                    <TouchableOpacity onPress={() => this.plus()}>
                                        <MaterialCommunityIcons name="plus-circle-outline" size={36} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    )}
                />
                <View style={styles.buttonFrame}>
                    {/* <Text style={styles.title}>{console.log(this.state.dataSource['productPrice'])}</Text> */}
                    <Button title="thanh toán" color="#dc143c" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    frameItem: {
        backgroundColor: "#f8f8ff",
        height: height * 0.22,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        // color: 'red'
    },
    price: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'red',
    },
    quantity: {

    },
    imageStyle: {
        height: 120,
        width: 120,
        marginVertical: 10,
        borderRadius: 10
    },  
    buttonFrame: {
        marginTop: 5,
        borderRadius: 10
    },
    inputText: {
        height: 30,
        width: 30,
        borderWidth: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        borderRadius: 5
    }
})
