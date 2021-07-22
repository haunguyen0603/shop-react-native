import React, { Component } from 'react'
import 
{ 
    SafeAreaView, 
    Text, 
    View, 
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class DiscountProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataProduct: [],
            page: 1,
            isLoading: false
        }
    }

    componentDidMount () {
        this.setState({isLoading: true}, this.getData)
    };

    getData = async () => {
      fetch('http://192.168.1.7/shop/public/show-discount-product-api?page=' + this.state.page)
      .then((response) => response.json())
      .then((json) => 
      {
        //   console.log(json);
        this.setState({
        dataProduct: this.state.dataProduct.concat(json),
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

    renderItem = ({item, index}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity>
                    <Image source={{uri:'http://192.168.1.7/shop/public/source/image/product/' + item.image}} style={styles.images}></Image>
                </TouchableOpacity> 
                    <Text style={styles.title}>{item.name}</Text>
                <TouchableOpacity>
                    <Text style={styles.content}>Giá cũ {this.currencyFormat(item.unit_price)}</Text>
                    <Text style={styles.promotion}><MaterialCommunityIcons name="cart-plus" size={24} color="#4d95c6" /> {this.currencyFormat(item.promotion_price)}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                numColumns={2}
                data={this.state.dataProduct}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                // extraData={selectedId}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0,5}
                ListFooterComponent={this.renderFooter}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 8,
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
      },
    images: {
        height: 180,
        width: 180,
        borderRadius: 8
    },
    title: {
        fontSize: 15,
    },
    content:{
        fontSize: 13,
    },
    promotion: {
        fontSize: 15,
        color: "red",
        fontWeight: 'bold'
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
})