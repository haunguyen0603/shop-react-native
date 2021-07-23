import React, { Component } from 'react';
import 
{ 
    Text, 
    View,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import DiscountProduct from './DiscountProduct.js';

const { height } = Dimensions.get('window');

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataBanner: []
        }
    }

    componentDidMount () {
      this.getData()
    };

    getData = async () => {
      fetch('http://192.168.43.236/shop/public/show-banner-api')
      .then((response) => response.json())
      .then((json) => 
      {
        //   console.log(json);
          this.setState({
            dataBanner: json,
          });
      })
      .catch((error) => {console.log(error);
      })
    }

    renderItem = ({item, index}) => {
        return (
            <View style={{paddingTop: 10}}>
                <Image source={{uri:'http://192.168.43.236/shop/public/' + item.image}} style={styles.banner} ></Image>
                <Text>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <Header /> */}
                <ScrollView>
                    <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.dataBanner}
                    renderItem={this.renderItem}
                    sliderWidth={420}
                    itemWidth={350}
                    autoplay={true}
                    autoplayInterval={2000}
                    lockScrollWhileSnapping={true}
                    loop={true}
                    />
                    <Text style={styles.title}>Danh mục sản phẩm</Text>
                    <View style={styles.rowType}>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source={{uri: "http://192.168.43.236/shop/public/images/product-type/ao-unisex.jpg"}} style={styles.image} />
                            <Text style={{fontSize:15}}>Áo Unisex</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source={{uri: "http://192.168.43.236/shop/public/images/product-type/quan.jpg"}} style={styles.image} />
                            <Text style={{fontSize:15}}>Quần</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source={{uri: "http://192.168.43.236/shop/public/images/product-type/giay.jpg"}} style={styles.image} />
                            <Text style={{fontSize:15}}>Giày</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowType}>
                        <TouchableOpacity style={{alignItems: 'center'}}>
                            <Image source={{uri: "http://192.168.43.236/shop/public/images/product-type/dong-ho.jpg"}} style={styles.image} />
                            <Text style={{fontSize:15}}>Đồng hồ</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Sản phẩm Khuyến mãi</Text>
                    {/* <Text>{console.log(this.props.navigation)}</Text> */}
                    <DiscountProduct navigation={this.props.navigation} />
                </ScrollView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 25
    },
    title: {
        fontSize: 20,
        paddingHorizontal:15,
        fontWeight: 'bold',
        color: '#4d95c6'
    },
    banner: {
        height: 200,
        width: 350,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
    },
    rowType: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginVertical: 10, 
        paddingHorizontal:20,
    }
})
