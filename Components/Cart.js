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
            disabledTouch: true
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
                    }, console.log(item))
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
        if (this.state.qty <= 1) {
            this.setState({
                disabledTouch: true
            })
        }   else {
            this.setState({
                qty: (this.state.qty - 1)
            })
        }
        
    }

    plus () {
        this.setState({
            qty: (this.state.qty + 1),
            disabledTouch: false
        })
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

    getOrder () {
        var arr = this.state.dataSource;
        var object = arr.reduce(
            (obj, item) => Object.assign(obj, {
                ['key'] : item.key,
                ['productName'] : item.productName,
                ['productImage'] : item.productImage,
                ['productPrice'] : item.productPrice,
                ['productQty'] : this.state.qty
            }), {}
        );
        console.log(object);
        // this.props.navigation.navigate('Order', object);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={{ width: 50, height: 50 }} source={require('../assets/logo.png')} />
                    <Text style={styles.titleHeader}>Giỏ hàng</Text>
                    <Text style={{ fontSize: 15, color: 'white', fontStyle: 'italic' }}>FreeShip</Text>
                </View>
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
                                    <TouchableOpacity onPress={() => this.minus()} disabled={this.state.disabledTouch}>
                                        <MaterialCommunityIcons name="minus-circle-outline" size={36} color="blue" />
                                    </TouchableOpacity>
                                    <TextInput 
                                        style={styles.inputText} 
                                        keyboardType="number-pad"
                                        onChangeText={(qty) => this.setState({qty: qty})}
                                    >{(this.state.qty)}</TextInput>
                                    <TouchableOpacity onPress={() => this.plus()}>
                                        <MaterialCommunityIcons name="plus-circle-outline" size={36} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                    )}
                />
                <View style={styles.buttonFrame}>
                    {/* <Text style={styles.title}>{console.log(this.state.dataSource['productPrice'])}</Text> onPress={() => this.props.navigation.navigate('Order')} */}
                    <Button title="đặt hàng ngay" color="#dc143c" onPress={() => this.getOrder()} />
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
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 10,
        backgroundColor: "#4d95c6",
        paddingTop: 25,
        paddingHorizontal: 10
    },
    titleHeader: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
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
