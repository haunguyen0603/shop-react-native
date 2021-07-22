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
  ActivityIndicator 
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "./Header";

export default class ProductList extends Component {
    constructor(props){
        super(props);
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
          // if (json.length != 0){
          //   this.setState({
          //     dataSource: this.state.dataSource.concat(json),
          //     isLoading: false
          //   });
          // } else {
          //   Alert.alert('THÔNG BÁO', 'Đã hết sản phẩm', [
          //     {text: 'OK', onPress: () => console.log('OK')}
          //   ])
          // }
          
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

    render(){
      return (
        <SafeAreaView style={styles.container}>
          {/* <Text style={{ fontSize:20, marginHorizontal:8 }}>Tất cả Sản phẩm</Text> */}
          <Header />
          <FlatList
              numColumns={2}
              data={this.state.dataSource}
              renderItem={({ item })=>(
              <View style={styles.item}>
                <TouchableOpacity>
                  <Image source={{uri:'http://192.168.1.7/shop/public/source/image/product/' + item.image}} style={styles.images}></Image>
                </TouchableOpacity> 
                <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity>
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
      backgroundColor: "white",
      // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 10,
      marginVertical: 5,
      flex: 0.5,
      alignItems: 'center',
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
    }
  });