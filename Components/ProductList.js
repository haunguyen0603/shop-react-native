import React, { Component } from "react";
import 
{ 
  Image, 
  FlatList, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ActivityIndicator,
  Dimensions,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fireBaseApp } from './FireBaseConfig';

const { height } = Dimensions.get('window');

export default class ProductList extends Component {
    constructor(props){
        super(props);
        this.itemRef = fireBaseApp.database().ref('Cart');
        this.state = {
            dataSource: [],
            page: 1,
            isLoading: false
        }
    }

    componentDidMount () {
      this.setState({isLoading: true}, this.getData)
    };

    getData = async () => {
      fetch('http://192.168.1.7/shop/public/show-product-api?page=' + this.state.page)
      .then((response) => response.json())
      .then((json) => 
      {
          // console.log(json);
          this.setState({
            dataSource: this.state.dataSource.concat(json),
            isLoading: false
          }); 
      })
      .catch((error) => {console.log(error);
      })
    }

    renderFooter = () => {
      return (
        this.state.isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View> : null
      )
    }

    handleLoadMore = () => {
      this.setState({
        page: this.state.page + 1,
        isLoading: true
      }, this.getData)
    }

    currencyFormat = (num) => {
      return 'VND ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    addCart (item) {
      fireBaseApp.auth().onAuthStateChanged((user) => {
        if (user) {

          this.itemRef.child(user.uid).push({
            productId: item.id,
            productName: item.name,
            productImage: item.image,
            productPrice: item.promotion_price === 0 ? item.unit_price : item.promotion_price,
          })

        } else {
          this.props.navigation.navigate('Login')
        }
      });

      
    }

    render(){
      return (
        <SafeAreaView style={styles.container}>
          <View style={{margin: 5, backgroundColor: '#fff'}}>
            <TextInput style={styles.searchBar} placeholder="Tìm kiếm" />
          </View>
          <FlatList
              numColumns={2}
              data={this.state.dataSource}
              renderItem={({ item })=>(
              <View style={styles.item}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetail', item)}>
                  <Image source={{uri:'http://192.168.1.7/shop/public/source/image/product/' + item.image}} style={styles.images}></Image>
                </TouchableOpacity> 
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity onPress={() => this.addCart(item)}>
                  <Text style={styles.content}><MaterialCommunityIcons name="cart-plus" size={24} color="#4d95c6" /> {this.currencyFormat(item.unit_price)}</Text>
                </TouchableOpacity>
                {/* <Text style={styles.content}>{item.id}</Text> */}
              </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0,5}
              ListFooterComponent={this.renderFooter}
          />
        </SafeAreaView>
      );
    }
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "white",
    },
    item: {
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 5,
      flex: 0.5,
      alignItems: 'center',
      backgroundColor: "#ffffff",
      borderRadius: 10,
      shadowColor: "#a9a9a9",
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.3
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    content:{
      fontSize: 13,
    },
    images:{
      width:180,
      height:180,
      borderRadius: 8
    },
    loader: {
      marginTop: 10,
      alignItems: 'center'
    },
    searchBar: {
      marginHorizontal: 8,
      height: height / 20,
      paddingLeft: 10,
    },
});