import React, { Component } from "react";
import { Image, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native";

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
      fetch('http://192.168.1.3/shop/public/show-product-api?page=' + this.state.page)
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

    render(){
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
              numColumns={2}
              data={this.state.dataSource}
              renderItem={({ item })=>(
              <TouchableOpacity style={styles.item}>
                <Image source={{uri:'http://192.168.1.3/shop/public/source/image/product/' + item.image}} style={styles.images}></Image>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.content}>{item.unit_price}</Text>
                {/* <Text style={styles.content}>{item.id}</Text> */}
              </TouchableOpacity>
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
      // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 8,
      flex: 0.5,
      alignItems: 'center'
    },
    title: {
      fontSize: 15,
    },
    content:{
      fontSize: 13,
    },
    images:{
      width:200,
      height:200,
    },
    loader: {
      marginTop: 10,
      alignItems: 'center'
    }
  });