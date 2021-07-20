import React, { Component } from 'react'
import 
{ 
    Text, 
    View,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native'
import Carousel from 'react-native-snap-carousel';

const horizontalMargin = 30;
const slideWidth = 300;
const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentDidMount () {
      this.getData()
    };

    getData = async () => {
      fetch('http://192.168.1.3/shop/public/show-banner-api')
      .then((response) => response.json())
      .then((json) => 
      {
        //   console.log(json);
          this.setState({
            dataSource: json,
          });
      })
      .catch((error) => {console.log(error);
      })
    }

    renderItem = ({item, index}) => {
        return (
            <View>
                <Image source={{uri:'http://192.168.1.3/shop/public/images/' + item.image}} style={styles.images} ></Image>
                <Text>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Banner Quảng cáo</Text>
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.dataSource}
                renderItem={this.renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                autoplay={true}
                autoplayInterval={2000}
                lockScrollWhileSnapping={true}
                loop={true}
                />
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        padding: 10,
    },
    images: {
        height: 200,
        width: 350,
    }
})
